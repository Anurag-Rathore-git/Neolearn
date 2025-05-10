import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export function UpcomingDeadlines() {
  const deadlines = [
    {
      id: 1,
      title: 'JavaScript Final Project',
      course: 'Web Development Bootcamp',
      dueDate: '2025-02-15',
      timeLeft: '3 days',
      type: 'Project',
    },
    {
      id: 2,
      title: 'Neural Networks Quiz',
      course: 'AI & ML Fundamentals',
      dueDate: '2025-02-18',
      timeLeft: '6 days',
      type: 'Quiz',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Deadlines</h2>
      <div className="space-y-4">
        {deadlines.map((deadline) => (
          <div key={deadline.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-medium text-gray-900">{deadline.title}</h3>
              <p className="text-sm text-gray-600">{deadline.course}</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Due {deadline.dueDate}</span>
                <Clock className="w-4 h-4 ml-4 mr-2" />
                <span>{deadline.timeLeft} left</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {deadline.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}