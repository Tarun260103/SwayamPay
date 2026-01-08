import api from './api';

// Mock implementations
export const paymentService = {
  processPayment: (paymentData) => {
    // Mock successful payment
    return Promise.resolve({
      data: {
        success: true,
        transactionId: 'TXN_' + Date.now(),
        message: 'Payment processed successfully',
        fraudScore: Math.random() * 0.1 // Low fraud score for demo
      }
    });
  },
  
  getTransactions: (params = {}) => {
    // Mock transactions data
    const mockTransactions = [
      {
        id: 'TXN_001',
        amount: 150.00,
        currency: 'USD',
        customerEmail: 'john@example.com',
        status: 'COMPLETED',
        fraudScore: 0.021,
        date: '2024-01-15 14:30:00',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'TXN_002',
        amount: 89.99,
        currency: 'USD',
        customerEmail: 'sarah@example.com',
        status: 'FRAUD_DETECTED',
        fraudScore: 0.875,
        date: '2024-01-15 13:15:00',
        paymentMethod: 'PayPal'
      }
    ];
    return Promise.resolve({ data: mockTransactions });
  },
  
  getDashboard: () => {
    // Mock dashboard data
    const mockDashboard = {
      totalRevenue: 12458,
      totalTransactions: 1247,
      fraudCount: 3,
      successRate: 99.8,
      recentTransactions: [
        {
          id: 1,
          amount: 150.00,
          currency: 'USD',
          customerEmail: 'customer1@example.com',
          status: 'COMPLETED',
          fraudScore: 0.021,
          createdAt: new Date()
        }
      ]
    };
    return Promise.resolve({ data: mockDashboard });
  }
};