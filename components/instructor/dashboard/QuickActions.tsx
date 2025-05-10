import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, MessageCircle, BarChart, Settings, Plus } from 'lucide-react';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <Plus className="w-5 h-5" />,
      label: 'Create Course',
      link: '/instructor/courses/new',
      color: 'text-indigo-600'
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: 'Manage Courses',
      link: '/instructor/course-management',
      color: 'text-blue-600'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Students',
      link: '/instructor/students',
      color: 'text-green-600'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Messages',
      link: '/instructor/messages',
      color: 'text-yellow-600'
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      label: 'Analytics',
      link: '/instructor/analytics',
      color: 'text-purple-600'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      link: '/instructor/settings',
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.link}
            className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className={action.color}>
              {action.icon}
            </div>
            <h3 className="font-medium text-gray-800 text-sm mt-2">
              {action.label}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}