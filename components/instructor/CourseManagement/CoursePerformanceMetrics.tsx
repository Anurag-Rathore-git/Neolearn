import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Star, DollarSign } from 'lucide-react';

interface CourseMetrics {
  id: string;
  title: string;
  enrollments: number;
  revenue: number;
  rating: number;
  completionRate: number;
}

interface CoursePerformanceMetricsProps {
  course: CourseMetrics;
}

export function CoursePerformanceMetrics({ course }: CoursePerformanceMetricsProps) {
  const metrics = [
    {
      title: 'Total Enrollments',
      value: course.enrollments,
      icon: <Users className="w-5 h-5 text-blue-500" />,
      change: '+12%',
      changeColor: 'text-green-500'
    },
    {
      title: 'Revenue',
      value: `$${course.revenue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      change: '+8%',
      changeColor: 'text-green-500'
    },
    {
      title: 'Average Rating',
      value: course.rating.toFixed(1),
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      change: '+0.2',
      changeColor: 'text-green-500'
    },
    {
      title: 'Completion Rate',
      value: `${course.completionRate}%`,
      icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
      change: '+5%',
      changeColor: 'text-green-500'
    }
  ];

  const chartData = [
    { name: 'Week 1', enrollments: 45 },
    { name: 'Week 2', enrollments: 52 },
    { name: 'Week 3', enrollments: 49 },
    { name: 'Week 4', enrollments: 63 },
    { name: 'Week 5', enrollments: 58 },
    { name: 'Week 6', enrollments: 71 }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Course Performance</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              {metric.icon}
              <span className={`text-sm font-medium ${metric.changeColor}`}>
                {metric.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-sm text-gray-500">{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="enrollments" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}