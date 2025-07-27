import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ImpactChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#82ca9d" animationDuration={1500} />
    </BarChart>
  </ResponsiveContainer>
);

export default ImpactChart;
