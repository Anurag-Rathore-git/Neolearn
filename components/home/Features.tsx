import React from 'react';
import { Brain, Target, Clock, Users, Shield, Zap } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-indigo-600" />,
      title: 'AI-Powered Learning',
      description: 'Our advanced AI algorithms create personalized learning paths tailored to your goals and pace.'
    },
    {
      icon: <Target className="w-12 h-12 text-indigo-600" />,
      title: 'Adaptive Assessments',
      description: 'Dynamic tests that adjust to your knowledge level for more effective learning outcomes.'
    },
    {
      icon: <Clock className="w-12 h-12 text-indigo-600" />,
      title: '24/7 AI Tutor',
      description: 'Get instant help and feedback from our AI tutor whenever you need it.'
    },
    {
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      title: 'Collaborative Learning',
      description: 'Connect with peers and experts in real-time discussion forums and study groups.'
    },
    {
      icon: <Shield className="w-12 h-12 text-indigo-600" />,
      title: 'Verified Content',
      description: 'All courses are vetted by industry experts to ensure high-quality education.'
    },
    {
      icon: <Zap className="w-12 h-12 text-indigo-600" />,
      title: 'Real-time Progress',
      description: 'Track your learning journey with detailed analytics and performance insights.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powered by Advanced AI Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of learning with our cutting-edge features designed to maximize your potential.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}