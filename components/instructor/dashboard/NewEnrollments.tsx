import React from 'react';
import { User, BookOpen } from 'lucide-react';

export function NewEnrollments() {
  // Mock data - replace with real data from API
  const enrollments = [
    {
      id: 1,
      student: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      },
      course: 'Advanced Web Development',
      date: '2025-02-01T10:00:00Z'
    },
    {
      id: 2,
      student: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
      },
      course: 'Machine Learning Fundamentals',
      date: '2025-02-01T09:30:00Z'
    },
    {
      id: 3,
      student: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
      },
      course: 'UI/UX Design Principles',
      date: '2025-02-01T09:00:00Z'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">New Enrollments</h2>

      <div className="space-y-4">
        {enrollments.map((enrollment) => (
          <div key={enrollment.id} className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {enrollment.student.avatar ? (
                <img
                  src={enrollment.student.avatar}
                  alt={enrollment.student.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-indigo-600" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {enrollment.student.name}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <BookOpen className="w-4 h-4 mr-1" />
                {enrollment.course}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(enrollment.date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}