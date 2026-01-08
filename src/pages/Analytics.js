import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { TrendingUp, Users, DollarSign, CreditCard } from 'lucide-react';

const Analytics = () => {
  // Mock data for charts
  const revenueData = [
    { name: 'Jan', revenue: 4000, transactions: 240 },
    { name: 'Feb', revenue: 3000, transactions: 198 },
    { name: 'Mar', revenue: 5000, transactions: 300 },
    { name: 'Apr', revenue: 2780, transactions: 189 },
    { name: 'May', revenue: 5890, transactions: 350 },
    { name: 'Jun', revenue: 4390, transactions: 280 },
  ];

  const fraudData = [
    { name: 'Low Risk', value: 85 },
    { name: 'Medium Risk', value: 10 },
    { name: 'High Risk', value: 5 },
  ];

  const paymentMethodsData = [
    { name: 'Credit Card', value: 65 },
    { name: 'PayPal', value: 20 },
    { name: 'Bank Transfer', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const FRAUD_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,580',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Total Transactions',
      value: '1,458',
      change: '+8.2%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      change: '+1.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Active Customers',
      value: '458',
      change: '+15.3%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Insights and performance metrics for your payment gateway</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm ${stat.color} mt-1`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Revenue & Transactions</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#0ea5e9" name="Revenue ($)" />
                <Bar dataKey="transactions" fill="#8b5cf6" name="Transactions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fraud Analysis */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Fraud Risk Analysis</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fraudData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fraudData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FRAUD_COLORS[index % FRAUD_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods Distribution</h2>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Average Response Time</span>
                  <span className="font-medium">45ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Fraud Detection Accuracy</span>
                  <span className="font-medium">99.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">System Uptime</span>
                  <span className="font-medium">99.9%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;