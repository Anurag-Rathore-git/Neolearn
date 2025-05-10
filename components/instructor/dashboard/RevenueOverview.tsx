import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Star } from 'lucide-react';

interface RevenueOverviewProps {
  dateRange: 'week' | 'month' | 'year';
  onDateRangeChange: (range: 'week' | 'month' | 'year') => void;
}

export function RevenueOverview({ dateRange, onDateRangeChange }: RevenueOverviewProps) {
  // Mock data - replace with real data from API
  const stats = [
    {
      title: 'Total Revenue',
      value: 'rs.12,845',
      change: '+12.5%',
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
    },
    {
      title: 'Course Sales',
      value: '245',
      change: '+8.2%',
      icon: <TrendingUp className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: 'Active Students',
      value: '1,234',
      change: '+15.3%',
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      icon: <Star className="w-6 h-6 text-yellow-600" />,
    },
  ];

  const revenueData = [
    { name: 'Mon', revenue: 2400 },
    { name: 'Tue', revenue: 1398 },
    { name: 'Wed', revenue: 9800 },
    { name: 'Thu', revenue: 3908 },
    { name: 'Fri', revenue: 4800 },
    { name: 'Sat', revenue: 3800 },
    { name: 'Sun', revenue: 4300 },
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-green-600 mt-1">{stat.change} from last period</p>
            </div>
            {stat.icon}
          </div>
        </div>
      ))}

      {/* Revenue Chart */}
      <div className="col-span-full bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <div className="flex space-x-2">
            {(['week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => onDateRangeChange(range)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  dateRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}