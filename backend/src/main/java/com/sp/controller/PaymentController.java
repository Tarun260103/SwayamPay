package com.sp.controller;

import com.sp.dto.PaymentRequest;
import com.sp.dto.PaymentResponse;
import com.sp.entity.Transaction;
import com.sp.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<PaymentResponse> processPayment(
            @RequestBody PaymentRequest paymentRequest,
            @AuthenticationPrincipal UserDetails userDetails) {

        Long userId = extractUserIdFromUserDetails(userDetails);
        PaymentResponse response = paymentService.processPayment(paymentRequest, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<Transaction>> getTransactionHistory(
            @AuthenticationPrincipal UserDetails userDetails) {

        Long userId = extractUserIdFromUserDetails(userDetails);
        List<Transaction> transactions = paymentService.getUserTransactionHistory(userId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/transaction/{transactionId}")
    public ResponseEntity<Transaction> getTransaction(
            @PathVariable String transactionId) {

        Transaction transaction = paymentService.getTransactionByTransactionId(transactionId);
        return ResponseEntity.ok(transaction);
    }

    @PostMapping("/paypal/create")
    public ResponseEntity<PaymentResponse> createPayPalPayment(
            @RequestBody PaymentRequest paymentRequest) {

        PaymentResponse response = paymentService.getPayPalService().createPaymentOrder(paymentRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/paypal/execute/{paymentId}")
    public ResponseEntity<PaymentResponse> executePayPalPayment(
            @PathVariable String paymentId,
            @RequestParam String payerId) {

        PaymentResponse response = paymentService.getPayPalService().capturePayment(paymentId, payerId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refund/{paymentId}")
    public ResponseEntity<PaymentResponse> refundPayment(
            @PathVariable String paymentId,
            @RequestParam BigDecimal amount) {

        PaymentResponse response = paymentService.getPayPalService().refundPayment(paymentId, amount);
        return ResponseEntity.ok(response);
    }

    private Long extractUserIdFromUserDetails(UserDetails userDetails) {
        // In a real implementation, you would extract user ID from JWT token
        // For now, return a mock user ID
        return 1L;
    }
}
