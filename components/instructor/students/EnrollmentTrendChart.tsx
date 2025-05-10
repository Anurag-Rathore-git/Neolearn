import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Calendar, TrendingUp, Users, ArrowUp, ArrowDown } from 'lucide-react';

interface EnrollmentTrendChartProps {
  courseId: string;
  dateRange: 'week' | 'month' | 'year';
  onDateRangeChange: (range: 'week' | 'month' | 'year') => void;
}

export function EnrollmentTrendChart({ courseId, dateRange, onDateRangeChange }: EnrollmentTrendChartProps) {
  // Mock data - replace with API calls
  const enrollmentData = [
    { date: '2025-02-01', enrollments: 12, completions: 5 },
    { date: '2025-02-02', enrollments: 15, completions: 7 },
    { date: '2025-02-03', enrollments: 10, completions: 4 },
    { date: '2025-02-04', enrollments: 18, completions: 8 },
    { date: '2025-02-05', enrollments: 14, completions: 6 },
    { date: '2025-02-06', enrollments: 20, completions: 9 },
    { date: '2025-02-07', enrollments: 16, completions: 7 }
  ];

  const metrics = {
    totalEnrollments: 105,
    enrollmentGrowth: '+15%',
    averageCompletionRate: '85%',
    retentionRate: '78%'
  };

  const sourceData = [
    { source: 'Direct', value: 40 },
    { source: 'Search', value: 25 },
    { source: 'Referral', value: 20 },
    { source: 'Social', value: 15 }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalEnrollments}</p>
            </div>
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">{metrics.enrollmentGrowth}</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.averageCompletionRate}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+5%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.retentionRate}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-red-500">-2%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+8%</span>
            <span className="text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      {/* Enrollment Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Enrollment Trends</h2>
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
            <AreaChart data={enrollmentData}>
              <defs>
                <linearGradient id="enrollmentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [value, 'Enrollments']}
              />
              <Area
                type="monotone"
                dataKey="enrollments"
                stroke="#4F46E5"
                fillOpacity={1}
                fill="url(#enrollmentGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enrollment Sources */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Enrollment Sources</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="source" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}