import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, BarChart as ChartIcon } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  revenue: number;
  students: number;
  growth: number;
}

export function RevenueBreakdown() {
  // Mock data - replace with API data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced Web Development',
      revenue: 12500,
      students: 250,
      growth: 15
    },
    {
      id: '2',
      title: 'Machine Learning Basics',
      revenue: 8900,
      students: 180,
      growth: 8
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      revenue: 6700,
      students: 135,
      growth: 12
    },
    {
      id: '4',
      title: 'Digital Marketing',
      revenue: 4500,
      students: 90,
      growth: 5
    }
  ];

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#6366F1'];

  const pieData = courses.map(course => ({
    name: course.title,
    value: course.revenue
  }));

  const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Breakdown</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={course.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{course.title}</h3>
                <span className={`flex items-center text-sm ${
                  course.growth > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {course.growth}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  ${course.revenue.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <ChartIcon className="w-4 h-4 mr-1" />
                  {((course.revenue / totalRevenue) * 100).toFixed(1)}% of total
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(course.revenue / totalRevenue) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}