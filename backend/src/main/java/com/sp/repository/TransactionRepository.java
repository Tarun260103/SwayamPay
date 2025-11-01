package com.sp.repository;

import com.sp.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

        List<Transaction> findByUserIdOrderByCreatedAtDesc(Long userId);

        List<Transaction> findByUserIdAndStatusOrderByCreatedAtDesc(Long userId, String status);

        Optional<Transaction> findByTransactionId(String transactionId);

        @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND t.createdAt BETWEEN :startDate AND :endDate ORDER BY t.createdAt DESC")
        List<Transaction> findTransactionsByUserAndDateRange(
                @Param("userId") Long userId,
                @Param("startDate") LocalDateTime startDate,
                @Param("endDate") LocalDateTime endDate);

        @Query("SELECT COUNT(t) FROM Transaction t WHERE t.user.id = :userId AND t.status = 'FAILED' AND t.createdAt >= :since")
        Long countFailedTransactionsSince(@Param("userId") Long userId, @Param("since") LocalDateTime since);

        @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id = :userId AND t.status = 'COMPLETED' AND t.createdAt BETWEEN :startDate AND :endDate")
        double getTotalSpentByUserInPeriod(
                @Param("userId") Long userId,
                @Param("startDate") LocalDateTime startDate,
                @Param("endDate") LocalDateTime endDate);

        @Query("SELECT t FROM Transaction t WHERE t.recipientEmail = :email AND t.status = 'COMPLETED' ORDER BY t.createdAt DESC")
        List<Transaction> findCompletedTransactionsByRecipientEmail(@Param("email") String email);


}


