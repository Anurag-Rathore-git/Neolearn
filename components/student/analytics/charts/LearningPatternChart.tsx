import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { hour: '6AM', sessions: 2 },
  { hour: '9AM', sessions: 8 },
  { hour: '12PM', sessions: 5 },
  { hour: '3PM', sessions: 7 },
  { hour: '6PM', sessions: 10 },
  { hour: '9PM', sessions: 4 },
];

export function LearningPatternChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sessions" fill="#4F46E5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}