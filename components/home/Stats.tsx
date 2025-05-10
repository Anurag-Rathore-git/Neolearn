import React from 'react';
import { Users, BookOpen, Award, Star, Brain, Clock, Globe, Trophy } from 'lucide-react';

export function Stats() {
  const stats = [
    { icon: <Users className="w-8 h-8 text-indigo-600" />, value: '50,000+', label: 'Active Learners' },
    { icon: <BookOpen className="w-8 h-8 text-indigo-600" />, value: '1,200+', label: 'Expert-Led Courses' },
    { icon: <Award className="w-8 h-8 text-indigo-600" />, value: '300+', label: 'Verified Instructors' },
    { icon: <Star className="w-8 h-8 text-indigo-600" />, value: '4.8/5', label: 'Average Rating' },
    { icon: <Brain className="w-8 h-8 text-indigo-600" />, value: '24/7', label: 'AI Support' },
    { icon: <Clock className="w-8 h-8 text-indigo-600" />, value: '95%', label: 'Completion Rate' },
    { icon: <Globe className="w-8 h-8 text-indigo-600" />, value: '150+', label: 'Countries' },
    { icon: <Trophy className="w-8 h-8 text-indigo-600" />, value: '1M+', label: 'Certificates Awarded' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}