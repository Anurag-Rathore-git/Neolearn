import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { courses } from '../../data/courses';

export function Courses() {
  // Show only first 3 courses on homepage
  const featuredCourses = courses.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Featured Courses
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Learn from industry experts with AI-enhanced courses designed for your success.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <Link to={`/course/${course.id}/learning-interface`} key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {course.rating}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={course.instructor.avatar} alt={course.instructor.name} className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-600">{course.instructor.name}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">Rs.{course.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}