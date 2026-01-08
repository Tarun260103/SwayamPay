import React, { useState } from 'react';
import { Search, Filter, Download, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const transactions = [
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
    },
    {
      id: 'TXN_003',
      amount: 299.00,
      currency: 'USD',
      customerEmail: 'mike@example.com',
      status: 'COMPLETED',
      fraudScore: 0.012,
      date: '2024-01-15 11:45:00',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'TXN_004',
      amount: 45.50,
      currency: 'EUR',
      customerEmail: 'lisa@example.com',
      status: 'FAILED',
      fraudScore: 0.342,
      date: '2024-01-15 10:20:00',
      paymentMethod: 'Bank Transfer'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'FRAUD_DETECTED':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-800 bg-green-100';
      case 'FRAUD_DETECTED':
        return 'text-red-800 bg-red-100';
      case 'FAILED':
        return 'text-gray-800 bg-gray-100';
      default:
        return 'text-gray-800 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <p className="text-gray-600">View and manage all your payment transactions</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-lg font-semibold text-gray-900">All Transactions</h2>
            

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 w-full"
                >
                  <option value="all">All Status</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="FRAUD_DETECTED">Fraud Detected</option>
                  <option value="FAILED">Failed</option>
                </select>
              </div>
              
              <Button variant="secondary" className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Fraud Score</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900 font-mono">{transaction.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {transaction.amount} {transaction.currency}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.customerEmail}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span>{transaction.status.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              transaction.fraudScore > 0.7 ? 'bg-red-500' :
                              transaction.fraudScore > 0.3 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${transaction.fraudScore * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {(transaction.fraudScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;