import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="text-indigo-600 font-semibold">AI-Powered Learning Platform</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Skills with{' '}
              <span className="text-indigo-600">Personalized</span> Learning
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the future of education with our AI-driven platform. Get personalized learning paths,
              real-time feedback, and adaptive assessments tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/courses" 
                className="flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Explore Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="flex items-center justify-center border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:border-gray-300 transition">
                Try Demo
              </button>
            </div>
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700">
                🎉 New: AI Tutor now available 24/7 for instant help and personalized feedback!
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="Students learning"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">AI-Powered Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}