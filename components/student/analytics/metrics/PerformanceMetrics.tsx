import React from 'react';
import { Target, TrendingUp, Clock } from 'lucide-react';

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-2xl font-bold text-gray-900">87.5%</p>
          </div>
          <Target className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="mt-2">
          <span className="text-sm text-green-600">↑ 5.2% improvement</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-2xl font-bold text-gray-900">92%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="mt-2">
          <span className="text-sm text-green-600">↑ 3.8% improvement</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Study Streak</p>
            <p className="text-2xl font-bold text-gray-900">15 days</p>
          </div>
          <Clock className="w-8 h-8 text-indigo-600" />
        </div>
        <div className="mt-2">
          <span className="text-sm text-indigo-600">Personal best!</span>
        </div>
      </div>
    </div>
  );
}