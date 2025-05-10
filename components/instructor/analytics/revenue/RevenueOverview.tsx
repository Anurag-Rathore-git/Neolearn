import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, TrendingUp, Users, ChevronDown, Download, Calendar } from 'lucide-react';

interface RevenueOverviewProps {
  dateRange: 'week' | 'month' | 'year';
  onDateRangeChange: (range: 'week' | 'month' | 'year') => void;
}

export function RevenueOverview({ dateRange, onDateRangeChange }: RevenueOverviewProps) {
  const [selectedChart, setSelectedChart] = useState<'revenue' | 'students'>('revenue');

  // Mock data - replace with API data
  const revenueData = [
    { date: '2025-01', revenue: 12400, students: 150 },
    { date: '2025-02', revenue: 15800, students: 180 },
    { date: '2025-03', revenue: 18900, students: 220 },
    { date: '2025-04', revenue: 16700, students: 190 },
    { date: '2025-05', revenue: 21500, students: 250 },
    { date: '2025-06', revenue: 24800, students: 280 },
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: 'RS.24,800',
      change: '+15.2%',
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
    },
    {
      title: 'Monthly Revenue',
      value: 'Rs.4,200',
      change: '+8.5%',
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
    },
    {
      title: 'Active Students',
      value: '280',
      change: '+12.3%',
      icon: <Users className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-sm text-green-600 mt-1">{metric.change} from last period</p>
              </div>
              {metric.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedChart('revenue')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedChart === 'revenue'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setSelectedChart('students')}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedChart === 'students'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Students
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => onDateRangeChange(e.target.value as 'week' | 'month' | 'year')}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            <button
              onClick={() => {/* Implement export logic */}}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {selectedChart === 'revenue' ? (
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
                />
                <YAxis 
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            ) : (
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short' })}
                />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => [value, 'Students']}
                  labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                />
                <Bar dataKey="students" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}