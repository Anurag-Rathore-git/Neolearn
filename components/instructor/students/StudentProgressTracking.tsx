import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { Clock, Target, Brain, Award } from 'lucide-react';

interface StudentProgressTrackingProps {
  studentId: string;
  courseId: string;
}

export function StudentProgressTracking({ studentId, courseId }: StudentProgressTrackingProps) {
  // Mock data - replace with API calls
  const progressData = [
    { week: 'Week 1', completion: 85, timeSpent: 120, score: 90 },
    { week: 'Week 2', completion: 75, timeSpent: 90, score: 85 },
    { week: 'Week 3', completion: 95, timeSpent: 150, score: 95 },
    { week: 'Week 4', completion: 65, timeSpent: 60, score: 80 },
  ];

  const studentMetrics = {
    averageScore: 88,
    completionRate: 80,
    timeSpent: '15h 30m',
    lastActive: '2 hours ago'
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{studentMetrics.averageScore}%</p>
            </div>
            <Target className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{studentMetrics.completionRate}%</p>
            </div>
            <Brain className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Time Spent</p>
              <p className="text-2xl font-bold text-gray-900">{studentMetrics.timeSpent}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Active</p>
              <p className="text-2xl font-bold text-gray-900">{studentMetrics.lastActive}</p>
            </div>
            <Award className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Completion</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completion" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Assessment Scores */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Scores</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                  dot={{ fill: '#4F46E5', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Progress */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Module Progress</h3>
        <div className="space-y-4">
          {/* Module 1 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Introduction to React</h4>
              <span className="text-sm text-gray-600">85% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          {/* Module 2 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">State Management</h4>
              <span className="text-sm text-gray-600">60% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>

          {/* Module 3 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Hooks and Custom Hooks</h4>
              <span className="text-sm text-gray-600">40% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '40%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <Target className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Completed Quiz: React Fundamentals</p>
              <p className="text-sm text-gray-500">Score: 95% • 2 hours ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Watched Lesson: Advanced Hooks</p>
              <p className="text-sm text-gray-500">Duration: 45 minutes • 3 hours ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Earned Badge: React Expert</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}