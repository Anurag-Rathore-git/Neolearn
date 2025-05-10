import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Clock, Award } from 'lucide-react';

export function StudentEngagement() {
  // Mock data - replace with real data from API
  const engagementData = [
    { date: '2025-01', activeStudents: 850, completionRate: 75, averageTime: 45 },
    { date: '2025-02', activeStudents: 920, completionRate: 78, averageTime: 48 },
    { date: '2025-03', activeStudents: 1100, completionRate: 82, averageTime: 52 },
    { date: '2025-04', activeStudents: 980, completionRate: 80, averageTime: 50 },
  ];

  const metrics = [
    {
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      label: 'Active Students',
      value: '1,234',
      trend: '+15%'
    },
    {
      icon: <Clock className="w-5 h-5 text-green-600" />,
      label: 'Avg. Time Spent',
      value: '45 mins',
      trend: '+8%'
    },
    {
      icon: <Award className="w-5 h-5 text-yellow-600" />,
      label: 'Completion Rate',
      value: '82%',
      trend: '+5%'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Student Engagement</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center space-x-3">
              {metric.icon}
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
                <span className="text-sm text-green-600">{metric.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="activeStudents"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ fill: '#4F46E5' }}
            />
            <Line
              type="monotone"
              dataKey="completionRate"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}