import React from 'react';
import { BookOpen, Users, Star, MessageCircle, Brain, Award, Code, BarChart as ChartBar } from 'lucide-react';

export function Categories() {
  const categories = [
    { name: 'Development', icon: <Code className="w-6 h-6 text-indigo-600" />, count: '425 Courses' },
    { name: 'Business', icon: <Users className="w-6 h-6 text-indigo-600" />, count: '320 Courses' },
    { name: 'Design', icon: <Star className="w-6 h-6 text-indigo-600" />, count: '290 Courses' },
    { name: 'Marketing', icon: <MessageCircle className="w-6 h-6 text-indigo-600" />, count: '245 Courses' },
    { name: 'AI & ML', icon: <Brain className="w-6 h-6 text-indigo-600" />, count: '180 Courses' },
    { name: 'Personal Dev', icon: <Award className="w-6 h-6 text-indigo-600" />, count: '215 Courses' },
    { name: 'Data Science', icon: <ChartBar className="w-6 h-6 text-indigo-600" />, count: '195 Courses' },
    { name: 'IT & Software', icon: <BookOpen className="w-6 h-6 text-indigo-600" />, count: '265 Courses' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Explore Top Categories
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Browse our diverse range of courses, each enhanced with AI-powered learning tools.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}