import React from 'react';
import { BookOpen, CheckCircle, Star, MessageCircle, Award } from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      type: 'lesson-complete',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      title: 'Completed Lesson',
      description: 'Advanced JavaScript Concepts',
      time: '2 hours ago'
    },
    {
      type: 'quiz-complete',
      icon: <Star className="w-5 h-5 text-yellow-600" />,
      title: 'Quiz Score: 92%',
      description: 'React Fundamentals Quiz',
      time: '5 hours ago'
    },
    {
      type: 'discussion',
      icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
      title: 'Posted in Discussion',
      description: 'React Hooks Best Practices',
      time: 'Yesterday'
    },
    {
      type: 'achievement',
      icon: <Award className="w-5 h-5 text-purple-600" />,
      title: 'Earned Achievement',
      description: 'Code Master Level 2',
      time: '2 days ago'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-3">
          {activity.icon}
          <div>
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            <p className="text-sm text-gray-600">{activity.description}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}