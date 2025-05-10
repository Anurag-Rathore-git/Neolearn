import React from 'react';
import { Brain, CheckCircle } from 'lucide-react';

export function CTA() {
  const benefits = [
    'Personalized AI Learning Path',
    '24/7 AI Tutor Support',
    'Interactive Course Content',
    'Industry-Recognized Certificates'
  ];

  return (
    <section className="py-20 bg-indigo-600">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="flex items-center space-x-2 mb-6">
              <Brain className="w-8 h-8" />
              <span className="text-xl font-semibold">AI-Powered Learning</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Learning Journey?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of students mastering new skills with our AI-enhanced platform.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-indigo-300" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition">
              Get Started Now
            </button>
          </div>
          <div className="relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="Students learning"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-900">AI-Enhanced Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}