import React from 'react';
import { Clock, MessageCircle, BookOpen, Award } from 'lucide-react';

export function EngagementMetrics() {
  const metrics = [
    {
      icon: <Clock className="w-5 h-5 text-indigo-600" />,
      label: 'Average Daily Time',
      value: '2.5 hours',
      trend: '+15%'
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-indigo-600" />,
      label: 'Discussion Posts',
      value: '24',
      trend: '+8'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      label: 'Resources Accessed',
      value: '156',
      trend: '+32'
    },
    {
      icon: <Award className="w-5 h-5 text-indigo-600" />,
      label: 'Achievements',
      value: '12',
      trend: '+3'
    }
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            {metric.icon}
            <div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="font-semibold text-gray-900">{metric.value}</p>
            </div>
          </div>
          <span className="text-sm text-green-600">{metric.trend}</span>
        </div>
      ))}
    </div>
  );
}