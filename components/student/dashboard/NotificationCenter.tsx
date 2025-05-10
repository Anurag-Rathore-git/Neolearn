import React from 'react';
import { Bell, MessageCircle, Award } from 'lucide-react';

export function NotificationCenter() {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New response to your question',
      time: '5 minutes ago',
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Earned new certificate',
      time: '2 hours ago',
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: 3,
      type: 'course',
      title: 'New lesson available',
      time: '1 day ago',
      icon: <Bell className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start space-x-3 border-b border-gray-100 pb-4">
            <div className="bg-indigo-100 p-2 rounded-lg">
              {notification.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
              <p className="text-xs text-gray-600">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full text-center text-sm text-indigo-600 hover:text-indigo-700">
        View All Notifications
      </button>
    </div>
  );
}