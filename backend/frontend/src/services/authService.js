import api from './api';

// Mock implementations to avoid API errors during development
export const authService = {
  login: (credentials) => {
    // Mock successful response
    return Promise.resolve({
      data: {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: credentials.email,
          name: 'Demo User',
          businessName: 'Demo Business'
        }
      }
    });
  },
  
  register: (userData) => {
    // Mock successful response
    return Promise.resolve({
      data: {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          businessName: userData.businessName
        }
      }
    });
  },
  
  verifyToken: (token) => {
    // Mock successful verification
    return Promise.resolve({
      data: {
        id: 1,
        email: 'demo@swayampay.com',
        name: 'Demo User',
        businessName: 'Demo Business'
      }
    });
  },
  
  refreshToken: () => {
    return Promise.resolve({
      data: {
        token: 'new-mock-jwt-token'
      }
    });
  }
};