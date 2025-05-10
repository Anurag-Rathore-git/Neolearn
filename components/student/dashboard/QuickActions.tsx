import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, BarChart2, MessageCircle, FileText } from 'lucide-react';

export function QuickActions() {
  const { courseId } = useParams();

  const actions = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      label: 'Resume Learning',
      description: 'Continue where you left off',
      to: `/course/${courseId || '1'}/learning-interface`
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      label: 'Analytics',
      description: 'View your learning progress',
      to: '/student/analytics'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: 'Ask Doubt',
      description: 'Get help from instructors',
      to: '/student/doubts-support'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: 'View Notes',
      description: 'Access your study materials',
      to: '/student/notes'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.to}
            className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="text-blue-600 mb-2">
              {action.icon}
            </div>
            <h3 className="font-medium text-gray-800 text-sm mb-1">
              {action.label}
            </h3>
            <p className="text-gray-500 text-xs text-center">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}