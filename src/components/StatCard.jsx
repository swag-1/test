import React from 'react';

export default function StatCard({ title, value, color, icon: Icon }) {
  return (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-content">
        <div className="stat-label" style={{ color: color }}>{title}</div>
        <div className="stat-value">{value}</div>
      </div>
      {Icon && <Icon size={32} color="#dddfeb" />}
    </div>
  );
}