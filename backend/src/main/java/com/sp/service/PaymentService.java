package com.sp.service;

import com.sp.dto.PaymentRequest;
import com.sp.dto.PaymentResponse;
import com.sp.entity.Transaction;
import com.sp.entity.User;
import com.sp.exception.InsufficientBalanceException;
import com.sp.exception.PaymentProcessingException;
import com.sp.exception.ResourceNotFoundException;
import com.sp.repository.TransactionRepository;
import com.sp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private FraudDetectionService fraudDetectionService;

    @Autowired
    private PayPalService payPalService;

    @Transactional
    public PaymentResponse processPayment(PaymentRequest paymentRequest, Long userId) {
        try {
            // Validate user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

            // Fraud detection
            if (fraudDetectionService.isSuspiciousTransaction(paymentRequest, user)) {
                throw new PaymentProcessingException("Transaction flagged as suspicious");
            }

            // Process payment based on method
            PaymentResponse response;
            switch (paymentRequest.getPaymentMethod().toUpperCase()) {
                case "PAYPAL":
                    response = payPalService.processPayPalPayment(paymentRequest);
                    break;
                case "WALLET":
                    response = processWalletPayment(paymentRequest, user);
                    break;
                default:
                    throw new PaymentProcessingException("Unsupported payment method: " + paymentRequest.getPaymentMethod());
            }

            // Save transaction
            Transaction transaction = new Transaction();
            transaction.setUser(user);
            transaction.setType("PAYMENT");
            transaction.setAmount(paymentRequest.getAmount());
            transaction.setStatus("COMPLETED");
            transaction.setDescription(paymentRequest.getDescription());
            transaction.setPaymentMethod(paymentRequest.getPaymentMethod());
            transaction.setRecipientEmail(paymentRequest.getRecipientEmail());
            transaction.setTransactionId(response.getTransactionId());

            transactionRepository.save(transaction);

            return response;

        } catch (Exception e) {
            // Save failed transaction
            saveFailedTransaction(paymentRequest, userId, e.getMessage());
            throw new PaymentProcessingException("Payment processing failed: " + e.getMessage(), e);
        }
    }

    public PayPalService getPayPalService() {
        return payPalService;
    }

    private PaymentResponse processWalletPayment(PaymentRequest paymentRequest, User user) {
        // Check balance
        if (user.getBalance().compareTo(paymentRequest.getAmount()) < 0) {
            throw new InsufficientBalanceException("Insufficient balance in wallet");
        }

        // Deduct amount
        user.setBalance(user.getBalance().subtract(paymentRequest.getAmount()));
        userRepository.save(user);

        return new PaymentResponse(
                "TXN_" + UUID.randomUUID().toString(),
                "COMPLETED",
                "Payment processed successfully from wallet"
        );
    }

    private void saveFailedTransaction(PaymentRequest paymentRequest, Long userId, String errorMessage) {
        try {
            User user = userRepository.findById(userId).orElse(null);

            Transaction transaction = new Transaction();
            transaction.setUser(user);
            transaction.setType("PAYMENT");
            transaction.setAmount(paymentRequest.getAmount());
            transaction.setStatus("FAILED");
            transaction.setDescription(paymentRequest.getDescription() + " - Error: " + errorMessage);
            transaction.setPaymentMethod(paymentRequest.getPaymentMethod());
            transaction.setRecipientEmail(paymentRequest.getRecipientEmail());
            transaction.setTransactionId("FAILED_" + UUID.randomUUID().toString());

            transactionRepository.save(transaction);
        } catch (Exception e) {
            // Log error but don't throw to avoid masking original exception
            System.err.println("Failed to save failed transaction: " + e.getMessage());
        }
    }

    public List<Transaction> getUserTransactionHistory(Long userId) {
        return transactionRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Transaction> getUserTransactionsByStatus(Long userId, String status) {
        return transactionRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, status);
    }

    public Transaction getTransactionByTransactionId(String transactionId) {
        return transactionRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "transactionId", transactionId));
    }

    public List<Transaction> getTransactionsByDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return transactionRepository.findTransactionsByUserAndDateRange(userId, startDate, endDate);
    }
}