// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { paymentService } from '../services/paymentService';
import { CreditCard, TrendingUp, AlertTriangle, CheckCircle, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockData = {
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
          },
          {
            id: 2,
            amount: 89.99,
            currency: 'USD',
            customerEmail: 'customer2@example.com',
            status: 'FRAUD_DETECTED',
            fraudScore: 0.875,
            createdAt: new Date()
          }
        ]
      };
      setDashboardData(mockData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${dashboardData?.totalRevenue?.toLocaleString() || '0'}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Transactions',
      value: dashboardData?.totalTransactions?.toLocaleString() || '0',
      change: '+8.2%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Fraud Detected',
      value: dashboardData?.fraudCount || '0',
      change: '-3.1%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Success Rate',
      value: `${dashboardData?.successRate || '99.8'}%`,
      change: '+0.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your payment overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className={`flex items-center mt-2 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
          <Link 
            to="/transactions" 
            className="text-primary-500 hover:text-primary-600 text-sm font-medium"
          >
            View all
          </Link>
        </div>
        
        <div className="space-y-4">
          {dashboardData?.recentTransactions?.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.status === 'COMPLETED' ? 'bg-green-50 text-green-600' :
                  transaction.status === 'FRAUD_DETECTED' ? 'bg-red-50 text-red-600' :
                  'bg-yellow-50 text-yellow-600'
                }`}>
                  {transaction.status === 'COMPLETED' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    ${transaction.amount} {transaction.currency}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.customerEmail}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  transaction.status === 'COMPLETED' ? 'text-green-600' :
                  transaction.status === 'FRAUD_DETECTED' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {transaction.status.replace('_', ' ')}
                </p>
                <p className="text-xs text-gray-500">
                  Fraud score: {(transaction.fraudScore * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;