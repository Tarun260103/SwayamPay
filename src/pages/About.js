import React from 'react';
import { Shield, Users, Target, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Our AI-powered fraud detection system protects your transactions with machine learning algorithms.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'We prioritize user experience and provide 24/7 support to ensure seamless payment processing.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Constantly evolving our technology to stay ahead of emerging threats and market trends.'
    },
    {
      icon: Award,
      title: 'Reliability',
      description: '99.9% uptime guarantee with robust infrastructure and redundant systems.'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      description: '15+ years in fintech and payment processing'
    },
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      description: 'Expert in AI and machine learning systems'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Security',
      description: 'Cybersecurity specialist with banking background'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SwayamPay</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing payment security with cutting-edge AI technology, 
            making online transactions safer and more reliable for businesses worldwide.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              To create a world where every digital transaction is secure, seamless, and trustworthy. 
              We combine advanced artificial intelligence with user-friendly interfaces to protect 
              businesses and consumers from fraud while ensuring exceptional user experiences.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;