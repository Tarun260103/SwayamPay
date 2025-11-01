package com.sp.service;

import com.sp.dto.PaymentRequest;
import com.sp.entity.Transaction;
import com.sp.entity.User;
import com.sp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FraudDetectionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // Fraud detection thresholds
    private static final BigDecimal HIGH_AMOUNT_THRESHOLD = new BigDecimal("5000.00");
    private static final BigDecimal SUSPICIOUS_AMOUNT_THRESHOLD = new BigDecimal("10000.00");
    private static final int MAX_TRANSACTIONS_PER_HOUR = 10;
    private static final int MAX_FAILED_ATTEMPTS_PER_HOUR = 5;

    public boolean isSuspiciousTransaction(PaymentRequest paymentRequest, User user) {
        return isHighAmountTransaction(paymentRequest.getAmount()) ||
                isUnusualTransactionPattern(user, paymentRequest) ||
                isSuspiciousRecipient(paymentRequest.getRecipientEmail()) ||
                isRapidTransactionSequence(user) ||
                hasMultipleFailedTransactionsRecently(user);
    }

    private boolean isHighAmountTransaction(BigDecimal amount) {
        return amount.compareTo(SUSPICIOUS_AMOUNT_THRESHOLD) > 0;
    }

    private boolean isUnusualTransactionPattern(User user, PaymentRequest paymentRequest) {
        List<Transaction> recentTransactions = transactionRepository
                .findTransactionsByUserAndDateRange(
                        user.getId(),
                        LocalDateTime.now().minusDays(30),
                        LocalDateTime.now()
                );

        if (recentTransactions.isEmpty() &&
                paymentRequest.getAmount().compareTo(HIGH_AMOUNT_THRESHOLD) > 0) {
            return true;
        }

        if (!recentTransactions.isEmpty()) {
            BigDecimal averageAmount = recentTransactions.stream()
                    .map(Transaction::getAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .divide(new BigDecimal(recentTransactions.size()), RoundingMode.HALF_UP);

            return paymentRequest.getAmount().compareTo(averageAmount.multiply(new BigDecimal("3"))) > 0;
        }

        return false;
    }

    private boolean isSuspiciousRecipient(String recipientEmail) {
        if (recipientEmail == null) return true;

        List<String> suspiciousDomains = List.of(
                "fake-payment.com", "fraud-domain.com", "test-fraud.com"
        );

        String domain = recipientEmail.substring(recipientEmail.indexOf('@') + 1);
        return suspiciousDomains.contains(domain.toLowerCase());
    }

    private boolean isRapidTransactionSequence(User user) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        List<Transaction> recentTransactions = transactionRepository
                .findTransactionsByUserAndDateRange(user.getId(), oneHourAgo, LocalDateTime.now());

        return recentTransactions.size() >= MAX_TRANSACTIONS_PER_HOUR;
    }

    private boolean hasMultipleFailedTransactionsRecently(User user) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        Long failedCount = transactionRepository.countFailedTransactionsSince(user.getId(), oneHourAgo);

        return failedCount >= MAX_FAILED_ATTEMPTS_PER_HOUR;
    }

    public FraudRiskLevel assessFraudRisk(PaymentRequest paymentRequest, User user) {
        int riskScore = 0;

        if (paymentRequest.getAmount().compareTo(HIGH_AMOUNT_THRESHOLD) > 0) {
            riskScore += 30;
        }
        if (paymentRequest.getAmount().compareTo(SUSPICIOUS_AMOUNT_THRESHOLD) > 0) {
            riskScore += 50;
        }
        if (isUnusualTransactionPattern(user, paymentRequest)) {
            riskScore += 25;
        }
        if (isSuspiciousRecipient(paymentRequest.getRecipientEmail())) {
            riskScore += 40;
        }
        if (isRapidTransactionSequence(user)) {
            riskScore += 35;
        }
        if (hasMultipleFailedTransactionsRecently(user)) {
            riskScore += 30;
        }

        if (riskScore >= 80) {
            return FraudRiskLevel.HIGH;
        } else if (riskScore >= 50) {
            return FraudRiskLevel.MEDIUM;
        } else if (riskScore >= 25) {
            return FraudRiskLevel.LOW;
        } else {
            return FraudRiskLevel.NONE;
        }
    }

    public FraudDetectionResult analyzeTransaction(PaymentRequest paymentRequest, User user) {
        boolean isSuspicious = isSuspiciousTransaction(paymentRequest, user);
        FraudRiskLevel riskLevel = assessFraudRisk(paymentRequest, user);
        List<String> riskFactors = identifyRiskFactors(paymentRequest, user);

        return new FraudDetectionResult(isSuspicious, riskLevel, riskFactors);
    }

    private List<String> identifyRiskFactors(PaymentRequest paymentRequest, User user) {
        List<String> factors = new ArrayList<>();

        if (paymentRequest.getAmount().compareTo(HIGH_AMOUNT_THRESHOLD) > 0) {
            factors.add("High transaction amount");
        }
        if (isUnusualTransactionPattern(user, paymentRequest)) {
            factors.add("Unusual transaction pattern");
        }
        if (isSuspiciousRecipient(paymentRequest.getRecipientEmail())) {
            factors.add("Suspicious recipient");
        }
        if (isRapidTransactionSequence(user)) {
            factors.add("Rapid transaction sequence");
        }
        if (hasMultipleFailedTransactionsRecently(user)) {
            factors.add("Multiple recent failed transactions");
        }

        return factors;
    }

    // Risk level enum
    public enum FraudRiskLevel {
        NONE, LOW, MEDIUM, HIGH
    }

    // Fraud detection result class
    public static class FraudDetectionResult {
        private final boolean suspicious;
        private final FraudRiskLevel riskLevel;
        private final List<String> riskFactors;

        public FraudDetectionResult(boolean suspicious, FraudRiskLevel riskLevel, List<String> riskFactors) {
            this.suspicious = suspicious;
            this.riskLevel = riskLevel;
            this.riskFactors = riskFactors;
        }

        public boolean isSuspicious() { return suspicious; }
        public FraudRiskLevel getRiskLevel() { return riskLevel; }
        public List<String> getRiskFactors() { return riskFactors; }
    }
}