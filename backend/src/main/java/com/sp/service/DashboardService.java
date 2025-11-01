package com.sp.service;

import com.sp.entity.Transaction;
import com.sp.entity.User;
import com.sp.repository.TransactionRepository;
import com.sp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PaymentService paymentService;

    public Map<String, Object> getUserDashboard(Long userId) {
        Map<String, Object> dashboard = new HashMap<>();

        // Get user details
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            dashboard.put("user", getUserSummary(user));
            dashboard.put("balance", user.getBalance());
        }

        // Recent transactions
        List<Transaction> recentTransactions = paymentService.getUserTransactionHistory(userId)
                .stream()
                .limit(5)
                .toList();
        dashboard.put("recentTransactions", recentTransactions);

        // Statistics
        LocalDateTime monthStart = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime now = LocalDateTime.now();

        BigDecimal monthlySpending = BigDecimal.valueOf(transactionRepository.getTotalSpentByUserInPeriod(userId, monthStart, now));
        dashboard.put("monthlySpending", monthlySpending != null ? monthlySpending : BigDecimal.ZERO);

        Long failedTransactions = transactionRepository.countFailedTransactionsSince(userId, monthStart);
        dashboard.put("failedTransactionsThisMonth", failedTransactions);

        // Transaction counts by status
        long completedCount = paymentService.getUserTransactionsByStatus(userId, "COMPLETED").size();
        long pendingCount = paymentService.getUserTransactionsByStatus(userId, "PENDING").size();
        long failedCount = paymentService.getUserTransactionsByStatus(userId, "FAILED").size();

        dashboard.put("completedTransactions", completedCount);
        dashboard.put("pendingTransactions", pendingCount);
        dashboard.put("failedTransactions", failedCount);

        // Weekly spending trend
        Map<String, BigDecimal> weeklySpending = getWeeklySpendingTrend(userId);
        dashboard.put("weeklySpending", weeklySpending);

        return dashboard;
    }

    private Map<String, Object> getUserSummary(User user) {
        Map<String, Object> summary = new HashMap<>();
        summary.put("id", user.getId());
        summary.put("email", user.getEmail());
        summary.put("firstName", user.getFirstName());
        summary.put("lastName", user.getLastName());
        summary.put("joinedDate", user.getCreatedAt());
        return summary;
    }

    private Map<String, BigDecimal> getWeeklySpendingTrend(Long userId) {
        Map<String, BigDecimal> weeklySpending = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();

        for (int i = 6; i >= 0; i--) {
            LocalDateTime dayStart = now.minusDays(i).withHour(0).withMinute(0).withSecond(0);
            LocalDateTime dayEnd = now.minusDays(i).withHour(23).withMinute(59).withSecond(59);

            BigDecimal daySpending = BigDecimal.valueOf(transactionRepository.getTotalSpentByUserInPeriod(userId, dayStart, dayEnd));
            String dayName = dayStart.getDayOfWeek().toString().substring(0, 3);

            weeklySpending.put(dayName, daySpending != null ? daySpending : BigDecimal.ZERO);
        }

        return weeklySpending;
    }

    public Map<String, Object> getTransactionAnalytics(Long userId) {
        Map<String, Object> analytics = new HashMap<>();

        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        LocalDateTime now = LocalDateTime.now();

        // Total transactions in last 30 days
        List<Transaction> recentTransactions = transactionRepository
                .findTransactionsByUserAndDateRange(userId, thirtyDaysAgo, now);
        analytics.put("totalTransactions", recentTransactions.size());

        // Successful transaction rate
        long successfulCount = recentTransactions.stream()
                .filter(t -> "COMPLETED".equals(t.getStatus()))
                .count();
        double successRate = recentTransactions.isEmpty() ? 0 : (double) successfulCount / recentTransactions.size() * 100;
        analytics.put("successRate", BigDecimal.valueOf(Math.round(successRate * 100.0) / 100.0));

        // Average transaction amount
        BigDecimal averageAmount = recentTransactions.stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (!recentTransactions.isEmpty()) {
            averageAmount = averageAmount.divide(BigDecimal.valueOf(recentTransactions.size()), 2, RoundingMode.HALF_UP);
        }
        analytics.put("averageTransactionAmount", averageAmount);

        // Most used payment method
        String mostUsedMethod = recentTransactions.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        Transaction::getPaymentMethod,
                        java.util.stream.Collectors.counting()
                ))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");
        analytics.put("preferredPaymentMethod", mostUsedMethod);

        // Total amount spent
        BigDecimal totalSpent = recentTransactions.stream()
                .filter(t -> "COMPLETED".equals(t.getStatus()))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        analytics.put("totalAmountSpent", totalSpent);

        return analytics;
    }

    public Map<String, Object> getFinancialSummary(Long userId) {
        Map<String, Object> financialSummary = new HashMap<>();

        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            financialSummary.put("currentBalance", user.getBalance());
        }

        // Last 30 days statistics
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        LocalDateTime now = LocalDateTime.now();

        BigDecimal totalIncome = transactionRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, "COMPLETED")
                .stream()
                .filter(t -> t.getCreatedAt().isAfter(thirtyDaysAgo))
                .filter(t -> "CREDIT".equals(t.getType()) || "REFUND".equals(t.getType()))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpenses = transactionRepository.findByUserIdAndStatusOrderByCreatedAtDesc(userId, "COMPLETED")
                .stream()
                .filter(t -> t.getCreatedAt().isAfter(thirtyDaysAgo))
                .filter(t -> "PAYMENT".equals(t.getType()) || "DEBIT".equals(t.getType()))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        financialSummary.put("totalIncomeLast30Days", totalIncome);
        financialSummary.put("totalExpensesLast30Days", totalExpenses);
        financialSummary.put("netSavingsLast30Days", totalIncome.subtract(totalExpenses));

        return financialSummary;
    }
}