import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import toast from 'react-hot-toast';

// Create Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useLocalStorage('swayampay_token', null);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = () => {
      const storedToken = localStorage.getItem('swayampay_token');
      if (storedToken) {
        // Mock user validation - replace with actual API call
        const mockUser = {
          id: 1,
          email: 'demo@swayampay.com',
          name: 'Demo User',
          businessName: 'Demo Business'
        };
        setUser(mockUser);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Mock login - replace with actual API call
      if (email && password) {
        const mockUser = {
          id: 1,
          email: email,
          name: 'Demo User',
          businessName: 'Demo Business'
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('swayampay_token', mockToken);
        
        toast.success('Login successful!');
        return { success: true, user: mockUser };
      } else {
        throw new Error('Invalid credentials');
      }
      
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      return { 
        success: false, 
        message: error.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Mock registration - replace with actual API call
      const mockUser = {
        id: 1,
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        businessName: userData.businessName
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('swayampay_token', mockToken);
      
      toast.success('Account created successfully!');
      return { success: true, user: mockUser };
      
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return { 
        success: false, 
        message: error.message || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('swayampay_token');
    toast.success('Logged out successfully!');
  };

  const updateProfile = async (profileData) => {
    try {
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
      return { success: true, user: updatedUser };
    } catch (error) {
      toast.error('Failed to update profile.');
      return { success: false, message: 'Profile update failed' };
    }
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  const value = {
    // State
    user,
    token,
    loading,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    
    // Utilities
    isAuthenticated: isAuthenticated()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };