import React from 'react';
import { LearningTimeChart } from './charts/LearningTimeChart';
import { CourseProgressChart } from './charts/CourseProgressChart';
import { SkillsRadarChart } from './charts/SkillsRadarChart';
import { AssessmentScoresChart } from './charts/AssessmentScoresChart';
import { LearningPatternChart } from './charts/LearningPatternChart';
import { EngagementMetrics } from './metrics/EngagementMetrics';
import { PerformanceMetrics } from './metrics/PerformanceMetrics';
import { LearningGoals } from './goals/LearningGoals';
import { ActivityFeed } from './activity/ActivityFeed';
import { Brain, Clock, Target, Award, TrendingUp, BarChart } from 'lucide-react';

export function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Learning Analytics</h1>
          <p className="text-gray-600">Track your progress and optimize your learning journey</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Learning Time</p>
                <h3 className="text-2xl font-bold text-gray-900">127.5 hours</h3>
                <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <Clock className="w-12 h-12 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                <h3 className="text-2xl font-bold text-gray-900">87.3%</h3>
                <p className="text-sm text-green-600 mt-1">↑ 5% improvement</p>
              </div>
              <Target className="w-12 h-12 text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed Courses</p>
                <h3 className="text-2xl font-bold text-gray-900">7 of 12</h3>
                <p className="text-sm text-gray-600 mt-1">58% completion rate</p>
              </div>
              <Award className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Time Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Learning Activity</h2>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                  <option value="year">Last 12 months</option>
                </select>
              </div>
              <LearningTimeChart />
            </div>

            {/* Course Progress */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Course Progress</h2>
              <CourseProgressChart />
            </div>

            {/* Assessment Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Assessment Performance</h2>
              <AssessmentScoresChart />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Learning Goals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Learning Goals</h2>
              <LearningGoals />
            </div>

            {/* Skills Analysis */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Skills Analysis</h2>
              <SkillsRadarChart />
            </div>

            {/* Engagement Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Engagement</h2>
              <EngagementMetrics />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
              <ActivityFeed />
            </div>
          </div>
        </div>

        {/* Learning Insights */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Learning Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium text-gray-900">Peak Learning Times</h3>
              </div>
              <p className="text-sm text-gray-600">
                You're most productive between 9 AM and 11 AM. Consider scheduling challenging topics during these hours.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium text-gray-900">Learning Streak</h3>
              </div>
              <p className="text-sm text-gray-600">
                You've maintained a 15-day learning streak! Keep going to build strong learning habits.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <BarChart className="w-5 h-5 text-indigo-600" />
                <h3 className="font-medium text-gray-900">Focus Areas</h3>
              </div>
              <p className="text-sm text-gray-600">
                Consider spending more time on practical exercises to reinforce theoretical concepts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}