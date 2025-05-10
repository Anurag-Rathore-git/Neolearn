import React from 'react';
import { Star } from 'lucide-react';

export function RecommendedCourses() {
  const courses = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      students: 1234,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      price: 89.99,
    },
    {
      id: 2,
      title: 'Data Science Essentials',
      instructor: 'Michael Chen',
      rating: 4.9,
      students: 2341,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      price: 94.99,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="border border-gray-100 rounded-lg overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.instructor}</p>
              <div className="flex items-center mt-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                <span className="text-sm text-gray-600 ml-2">({course.students} students)</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-gray-900">${course.price}</span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}