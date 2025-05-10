import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface PerformanceMetricsProps {
  dateRange: 'week' | 'month' | 'year';
}

export function PerformanceMetrics({ dateRange }: PerformanceMetricsProps) {
  // Mock data - replace with real data from API
  const performanceData = [
    { metric: 'Student Satisfaction', value: 85 },
    { metric: 'Course Completion', value: 78 },
    { metric: 'Engagement Rate', value: 92 },
    { metric: 'Content Quality', value: 88 },
    { metric: 'Response Time', value: 75 },
    { metric: 'Revenue Growth', value: 82 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Performance"
              dataKey="value"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {performanceData.map((metric) => (
          <div key={metric.metric} className="text-center">
            <p className="text-sm text-gray-600">{metric.metric}</p>
            <p className="text-lg font-semibold text-gray-900">{metric.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}