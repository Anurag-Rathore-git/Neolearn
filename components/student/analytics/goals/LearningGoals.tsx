import React from 'react';
import { Target, CheckCircle, Clock } from 'lucide-react';

export function LearningGoals() {
  const goals = [
    {
      title: 'Complete Web Development Course',
      progress: 85,
      deadline: '2025-03-15',
      status: 'on-track'
    },
    {
      title: 'Master React Fundamentals',
      progress: 60,
      deadline: '2025-04-01',
      status: 'at-risk'
    },
    {
      title: 'Build Portfolio Project',
      progress: 30,
      deadline: '2025-05-15',
      status: 'on-track'
    }
  ];

  return (
    <div className="space-y-4">
      {goals.map((goal, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">{goal.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${
              goal.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {goal.status === 'on-track' ? 'On Track' : 'At Risk'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{goal.progress}% completed</span>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>Due {goal.deadline}</span>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
        <Target className="w-4 h-4 mr-2" />
        Set New Goal
      </button>
    </div>
  );
}