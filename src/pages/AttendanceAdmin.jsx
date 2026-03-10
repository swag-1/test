import React, { useState, useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { 
  Users, UserX, TrendingUp, Download, ChevronDown, 
  Filter, Award, AlertTriangle, FileText, Share2, 
  ArrowUpRight, Printer, ShieldCheck, Zap
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Attendance.css';

export default function AttendanceAdmin() {
  const [timeline, setTimeline] = useState('weekly');
  const [showExport, setShowExport] = useState(false);

  const datasets = {
    weekly: [
      { name: 'Mon', attendance: 20, prev: 25 }, { name: 'Tue', attendance: 50, prev: 44 },
      { name: 'Wed', attendance: 60, prev: 78 }, { name: 'Thu', attendance: 82, prev: 85 },
      { name: 'Fri', attendance: 91, prev: 89 }
    ],
    monthly: [
      { name: 'Week 1', attendance: 85, prev: 80 }, { name: 'Week 2', attendance: 92, prev: 91 },
      { name: 'Week 3', attendance: 78, prev: 82 }, { name: 'Week 4', attendance: 95, prev: 88 }
    ],
    yearly: [
      { name: 'Term 1', attendance: 94, prev: 92 }, { name: 'Term 2', attendance: 89, prev: 90 },
      { name: 'Term 3', attendance: 91, prev: 93 }
    ]
  };

  const activeData = useMemo(() => datasets[timeline], [timeline]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          
          {/* PREMIUM TOP BAR */}
          <div className="admin-status-bar">
            <div className="pulse-indicator">
              <span className="dot"></span>
              System Live: Academic Year 2025/2026
            </div>
            <div className="security-tag">
              <ShieldCheck size={14} /> Encrypted Data Access
            </div>
          </div>

          <div className="attendance-header-row">
            <div className="title-group">
              <h2 className="premium-title">Institutional Oversight</h2>
              <p className="subtitle">Comprehensive Attendance Intelligence & Reporting</p>
            </div>

            <div className="action-group">
              <button className="btn-secondary-outline"><Printer size={18} /> Print View</button>
              <div className="export-dropdown-wrapper">
                <button className="btn-primary-solid" onClick={() => setShowExport(!showExport)}>
                  <Download size={18} /> 
                  <span>Generate Report</span>
                  <ChevronDown size={16} className={showExport ? 'rotate' : ''} />
                </button>
                {showExport && (
                  <div className="export-menu animate-pop">
                    <div className="menu-section-label">Formal Formats</div>
                    <div className="menu-item highlight"><FileText size={16} /> Official PDF Report</div>
                    <div className="menu-item"><Share2 size={16} /> Executive Excel Summary</div>
                    <div className="menu-divider"></div>
                    <div className="menu-item small"><Zap size={14} /> Send to Principal's Email</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KPI METRIC TILES */}
          <div className="kpi-grid-premium">
            <MetricCard icon={<Users />} label="Aggregate Presence" value="94.2%" trend="+2.4%" color="indigo" />
            <MetricCard icon={<UserX />} label="Absence Incidents" value="12" trend="-10%" color="rose" />
            <MetricCard icon={<TrendingUp />} label="Projected Monthly" value="96.1%" trend="Stable" color="emerald" />
          </div>

          <div className="attendance-main-grid">
            {/* ANALYTICS ENGINE */}
            <div className="chart-card-full">
              <div className="card-inner-header">
                <div>
                  <h4>Attendance Velocity</h4>
                  <p className="card-sub">Comparing current period vs previous baseline</p>
                </div>
                <div className="pill-toggle-premium">
                  {['weekly', 'monthly', 'yearly'].map((t) => (
                    <button 
                      key={t}
                      className={timeline === t ? 'active' : ''} 
                      onClick={() => setTimeline(t)}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="chart-box-large">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={activeData} key={timeline}>
                    <defs>
                      <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={3} fill="url(#colorCurrent)" animationDuration={1200} />
                    <Area type="monotone" dataKey="prev" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* INSIGHTS SIDEBAR */}
            <div className="attendance-side-panel">
              <div className="insight-card">
                <div className="insight-header">
                  <Zap size={16} className="text-amber-500" />
                  <span>AI Predictor</span>
                </div>
                <p>Attendance is likely to dip by <strong>4%</strong> next Thursday due to scheduled holidays.</p>
              </div>

              <div className="performance-card">
                <h4 className="side-label">Departmental Ranking</h4>
                <div className="ranking-list">
                  <RankingRow label="Science Dept" value={98} color="#6366f1" />
                  <RankingRow label="Arts & Humanities" value={82} color="#f43f5e" />
                  <RankingRow label="Business School" value={91} color="#10b981" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// SUB-COMPONENTS FOR CLEANER CODE
const MetricCard = ({ icon, label, value, trend, color }) => (
  <div className={`metric-card-v3 ${color}`}>
    <div className="m-icon-box">{icon}</div>
    <div className="m-details">
      <span>{label}</span>
      <h3>{value}</h3>
      <div className="m-trend"><ArrowUpRight size={12} /> {trend}</div>
    </div>
  </div>
);

const RankingRow = ({ label, value, color }) => (
  <div className="ranking-item">
    <div className="ranking-text"><span>{label}</span><strong>{value}%</strong></div>
    <div className="ranking-bar-bg"><div className="ranking-bar-fill" style={{ width: `${value}%`, background: color }}></div></div>
  </div>
);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip-premium">
        <p className="label">{`${payload[0].payload.name}`}</p>
        <p className="val current">Current: <span>{payload[0].value}%</span></p>
        <p className="val prev">Previous: <span>{payload[1].value}%</span></p>
      </div>
    );
  }
  return null;
};