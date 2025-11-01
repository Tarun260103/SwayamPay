package com.sp.repository;

import com.sp.entity.Transaction;
import com.sp.repository.CustomTransactionRepository;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class CustomTransactionRepositoryImpl implements CustomTransactionRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Transaction> findLargeTransactions(Double threshold) {
        String jpql = "SELECT t FROM Transaction t WHERE t.amount > :threshold AND t.status = 'COMPLETED' ORDER BY t.amount DESC";
        TypedQuery<Transaction> query = entityManager.createQuery(jpql, Transaction.class);
        query.setParameter("threshold", threshold);
        return query.getResultList();
    }

    @Override
    public List<Object[]> getTransactionSummaryByUser(LocalDateTime startDate, LocalDateTime endDate) {
        String jpql = "SELECT t.user.id, COUNT(t), SUM(t.amount) FROM Transaction t " +
                "WHERE t.createdAt BETWEEN :startDate AND :endDate AND t.status = 'COMPLETED' " +
                "GROUP BY t.user.id";
        TypedQuery<Object[]> query = entityManager.createQuery(jpql, Object[].class);
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);
        return query.getResultList();
    }
}