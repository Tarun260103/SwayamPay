// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Zap, Lock, BarChart3, ArrowRight, CreditCard } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'AI-Powered Security',
      description: 'Advanced fraud detection using machine learning algorithms to protect your transactions.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process payments instantly with our optimized payment gateway infrastructure.'
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Gain insights into your payment patterns with detailed analytics and reporting.'
    },
    {
      icon: Lock,
      title: 'Bank-Level Security',
      description: 'Your transactions are protected with enterprise-grade security measures.'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime' },
    { number: '50ms', label: 'Avg Response' },
    { number: '0.01%', label: 'Fraud Rate' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Secure Payments
              <span className="text-primary-500"> Powered by AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              SwayamPay combines cutting-edge AI fraud detection with seamless payment processing 
              to keep your transactions safe and reliable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="border border-primary-500 text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                  >
                    Merchant Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SwayamPay?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're redefining payment security with artificial intelligence and seamless integration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of merchants who trust SwayamPay for their payment processing needs.
          </p>
          <Link
            to={user ? "/dashboard" : "/register"}
            className="bg-white text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <CreditCard className="h-5 w-5" />
            <span>Start Accepting Payments</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;