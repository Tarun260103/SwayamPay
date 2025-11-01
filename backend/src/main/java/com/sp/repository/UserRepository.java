package com.sp.repository;

import com.sp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("SELECT u.balance FROM User u WHERE u.id = :userId")
    Optional<Double> findBalanceByUserId(@Param("userId") Long userId);

    @Query("UPDATE User u SET u.balance = u.balance + :amount WHERE u.id = :userId")
    void updateBalance(@Param("userId") Long userId, @Param("amount") Double amount);
}