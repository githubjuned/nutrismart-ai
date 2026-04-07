import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockData = [
  { day: 'Mon', calories: 1800, budget: 140 },
  { day: 'Tue', calories: 2100, budget: 160 },
  { day: 'Wed', calories: 1950, budget: 150 },
  { day: 'Thu', calories: 2200, budget: 145 },
  { day: 'Fri', calories: 2000, budget: 155 },
  { day: 'Sat', calories: 2400, budget: 180 },
  { day: 'Sun', calories: 1900, budget: 130 },
];

const Progress = () => {
  const { profile } = useContext(UserContext);

  return (
    <div>
      <h1 className="text-xl mb-6">Progress & Trends</h1>

      <h2 className="mb-4">Calorie Intake (Past 7 Days)</h2>
      <div className="card mb-6" style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Bar dataKey="calories" fill="var(--warning)" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="mb-4">Budget Spent (₹)</h2>
      <div className="card" style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Line type="monotone" dataKey="budget" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="text-center mt-2 text-xs text-muted">
          Goal: Under ₹{profile.budget}
        </div>
      </div>
    </div>
  );
};

export default Progress;
