import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Problem Solving', score: 85 },
  { subject: 'Technical Skills', score: 75 },
  { subject: 'Communication', score: 65 },
  { subject: 'Creativity', score: 80 },
  { subject: 'Leadership', score: 70 },
  { subject: 'Teamwork', score: 90 },
];

export function SkillsRadarChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Skills"
            dataKey="score"
            stroke="#4F46E5"
            fill="#4F46E5"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}