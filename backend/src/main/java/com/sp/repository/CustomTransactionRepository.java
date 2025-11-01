package com.sp.repository;

import com.sp.entity.Transaction;
import java.time.LocalDateTime;
import java.util.List;

public interface CustomTransactionRepository {
    List<Transaction> findLargeTransactions(Double threshold);
    List<Object[]> getTransactionSummaryByUser(LocalDateTime startDate, LocalDateTime endDate);
}