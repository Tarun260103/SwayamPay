package com.sp.controller;

import com.sp.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getUserDashboard(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = extractUserIdFromUserDetails(userDetails);
        Map<String, Object> dashboard = dashboardService.getUserDashboard(userId);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getTransactionAnalytics(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = extractUserIdFromUserDetails(userDetails);
        Map<String, Object> analytics = dashboardService.getTransactionAnalytics(userId);
        return ResponseEntity.ok(analytics);
    }

    private Long extractUserIdFromUserDetails(UserDetails userDetails) {
        // In a real implementation, you would extract user ID from JWT token
        // For now, return a mock user ID
        return 1L;
    }
}