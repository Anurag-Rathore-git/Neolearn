import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Web Development', progress: 85 },
  { name: 'Data Science', progress: 65 },
  { name: 'UI/UX Design', progress: 45 },
  { name: 'Machine Learning', progress: 30 },
  { name: 'Digital Marketing', progress: 90 },
];

export function CourseProgressChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Bar
            dataKey="progress"
            fill="#4F46E5"
            radius={[0, 4, 4, 0]}
            label={{ position: 'right', fill: '#6B7280' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}