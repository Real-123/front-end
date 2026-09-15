"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Grade {
  subject: string;
  score: number;
}

export default function GradesChart({ data }: { data: Grade[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-72 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500 font-medium">No grades available to display.</p>
      </div>
    );
  }

  return (
    <div className="h-72 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="subject" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 500 }} 
            dy={12} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 500 }} 
          />
          <Tooltip 
            cursor={{ fill: '#F3F4F6' }} 
            contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} 
          />
          <Bar 
            dataKey="score" 
            fill="#2563EB" 
            radius={[6, 6, 0, 0]} 
            maxBarSize={64} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
