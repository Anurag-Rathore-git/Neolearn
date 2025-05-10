import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Quiz 1', score: 75 },
  { name: 'Quiz 2', score: 82 },
  { name: 'Assignment 1', score: 88 },
  { name: 'Quiz 3', score: 85 },
  { name: 'Project 1', score: 92 },
  { name: 'Final Exam', score: 89 },
];

export function AssessmentScoresChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
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
  );
}