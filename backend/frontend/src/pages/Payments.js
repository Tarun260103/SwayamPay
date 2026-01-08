import React, { useState } from 'react';
import { CreditCard, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';
import PaymentForm from '../components/forms/PaymentForm';
import { Card, CardHeader, CardContent } from '../components/ui/Card';

const Payments = () => {
  const [recentPayment, setRecentPayment] = useState(null);

  const handlePaymentSuccess = (paymentData) => {
    setRecentPayment(paymentData);
  };

  const paymentHistory = [
    {
      id: 1,
      amount: 150.00,
      currency: 'USD',
      customerEmail: 'customer1@example.com',
      status: 'COMPLETED',
      fraudScore: 0.021,
      date: '2024-01-15 14:30:00'
    },
    {
      id: 2,
      amount: 89.99,
      currency: 'USD',
      customerEmail: 'customer2@example.com',
      status: 'FRAUD_DETECTED',
      fraudScore: 0.875,
      date: '2024-01-15 13:15:00'
    },
    {
      id: 3,
      amount: 299.00,
      currency: 'USD',
      customerEmail: 'customer3@example.com',
      status: 'COMPLETED',
      fraudScore: 0.012,
      date: '2024-01-15 11:45:00'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment Processing</h1>
        <p className="text-gray-600">Process new payments and view recent transactions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Process New Payment</h2>
          </CardHeader>
          <CardContent>
            <PaymentForm onSuccess={handlePaymentSuccess} />
          </CardContent>
        </Card>

        {/* Recent Payments & Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="bg-green-50 p-3 rounded-lg mr-4">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Processed</p>
                    <p className="text-2xl font-bold text-gray-900">$12,458</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="bg-blue-50 p-3 rounded-lg mr-4">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Successful</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        payment.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {payment.status === 'COMPLETED' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          ${payment.amount} {payment.currency}
                        </p>
                        <p className="text-sm text-gray-500">{payment.customerEmail}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        payment.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {payment.status.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        Score: {(payment.fraudScore * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payments;