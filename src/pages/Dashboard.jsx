
import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, Briefcase, Wallet, 
  ChevronLeft, ChevronRight, MoreVertical,
  User, UserRound, TrendingUp, Trophy, Star,
  Calendar as CalIcon
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Dashboard.css';

// --- Animated Counter with Staggered Delay ---
const AnimatedCounter = ({ value, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''), 10);
    
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smoother finish
      const easeOutQuad = (t) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      
      const currentCount = Math.floor(easedProgress * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [started, value, duration]);

  const formatted = count.toLocaleString();
  return value.startsWith('$') ? `$${formatted}` : formatted;
};

const LocalStatCard = ({ title, value, color, icon: Icon, delay }) => (
  <div className="stat-card-item" style={{ borderLeft: `4px solid ${color}` }}>
    <div className="stat-info">
      <div className="stat-label" style={{ color: color }}>{title}</div>
      <div className="stat-value">
        <AnimatedCounter value={value} delay={delay} />
      </div>
    </div>
    <Icon size={24} color="#dddfeb" />
  </div>
);

// --- Mock Data ---
const topStudents = [
  { id: 1, name: "Alex Johnson", grade: "10th", score: "98%", avatar: "AJ" },
  { id: 2, name: "Maria Garcia", grade: "12th", score: "96%", avatar: "MG" },
  { id: 3, name: "Liam Smith", grade: "9th", score: "95%", avatar: "LS" }
];

const upcomingEvents = [
  { id: 1, date: "28 Jan", title: "Science Fair", color: "blue" },
  { id: 2, date: "28 Jan", title: "Vacation Fair", color: "purple" }
];

const genderData = [
  { name: 'Boys', value: 750, color: '#4e73df' },
  { name: 'Girls', value: 650, color: '#1cc88a' }
];

const attendanceData = [
  { day: 'Mon', boys: 95, girls: 90 },
  { day: 'Tue', boys: 88, girls: 96 },
  { day: 'Wed', boys: 92, girls: 90 },
  { day: 'Thu', boys: 85, girls: 88 },
  { day: 'Fri', boys: 90, girls: 94 },
];

const financeData = [
  { month: 'Jan', fees: 4200, expenses: 2800 },
  { month: 'Feb', fees: 5100, expenses: 3100 },
  { month: 'Mar', fees: 4800, expenses: 3900 },
  { month: 'Apr', fees: 6200, expenses: 3400 },
  { month: 'May', fees: 5500, expenses: 4000 },
  { month: 'Jun', fees: 7000, expenses: 4200 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          
          {/* STAGGERED TOP STATS */}
          <div className="stats-row">
            <LocalStatCard title="Total Students" value="1,400" color="#4e73df" icon={Users} delay={0} />
            <LocalStatCard title="Total Teachers" value="85" color="#1cc88a" icon={UserCheck} delay={400} />
            <LocalStatCard title="Total Staff" value="32" color="#36b9cc" icon={Briefcase} delay={800} />
            <LocalStatCard title="Account Balance" value="$24,500" color="#f6c23e" icon={Wallet} delay={1200} />
          </div>

          <div className="content-grid-layout">
            <div className="left-column">
              <div className="charts-row">
                <div className="viz-card pie-card">
                  <div className="viz-header">
                    <h3>Gender Distribution</h3>
                    <MoreVertical size={14} color="#d1d3e2" />
                  </div>
                  <div className="pie-wrapper">
                    <div className="pie-chart-container">
                      <div className="pie-center-icons">
                        <div className="icon-group"><User size={32} color="#4e73df" strokeWidth={2.5} /></div>
                        <div className="icon-group"><UserRound size={32} color="#1cc88a" strokeWidth={2.5} /></div>
                      </div>
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie data={genderData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value">
                            {genderData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                          </Pie>
                          <Tooltip cornerRadius={10} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="viz-card bar-card">
                  <div className="viz-header">
                    <h3>Weekly Attendance</h3>
                    <div className="score-badge">Avg: 92.4%</div>
                  </div>
                  <div style={{ width: '100%', height: 230 }}>
                    <ResponsiveContainer>
                      <BarChart data={attendanceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f2f2f2" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                        <Tooltip cursor={{fill: '#f8f9fc'}} />
                        <Bar dataKey="boys" fill="#4e73df" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="girls" fill="#1cc88a" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="viz-card financial-card">
                <div className="viz-header">
                  <div className="title-with-icon">
                    <TrendingUp size={18} color="#4e73df" />
                    <h3>Financial Trend</h3>
                  </div>
                </div>
                <div style={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer>
                    <LineChart data={financeData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f2f2f2" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11}} unit="$" />
                      <Tooltip />
                      <Legend verticalAlign="top" align="right" iconType="circle" />
                      <Line type="monotone" dataKey="fees" stroke="#1cc88a" strokeWidth={3} dot={{ r: 4 }} name="Fees Payment" />
                      <Line type="monotone" dataKey="expenses" stroke="#e74a3b" strokeWidth={3} dot={{ r: 4 }} name="Expenses" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <aside className="calendar-side-panel">
              <div className="viz-card side-content-card">
                <div className="cal-nav-header">
                  <div className="title-with-icon">
                    <CalIcon size={16} color="#4e73df" />
                    <h3>Calendar</h3>
                  </div>
                </div>
                
                <div className="cal-days-grid">
                  {['S','M','T','W','T','F','S'].map(d => <div key={d} className="day-name">{d}</div>)}
                  {[...Array(31)].map((_, i) => (
                    <div key={i} className={`day-num ${i === 26 ? 'today' : ''}`}>{i + 1}</div>
                  ))}
                </div>

                <div className="activity-list">
                  <h4 className="section-subtitle">Upcoming Events</h4>
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="activity-item">
                      <div className={`act-date ${event.color}`}>{event.date}</div>
                      <div className="act-info">{event.title}</div>
                    </div>
                  ))}
                </div>

                <hr className="side-divider" />

                <div className="top-performers-section">
                  <div className="viz-header" style={{padding: '10px 0'}}>
                    <div className="title-with-icon">
                      <Trophy size={16} color="#f6c23e" />
                      <h3 style={{fontSize: '14px'}}>Top Performers</h3>
                    </div>
                  </div>
                  <div className="student-list">
                    {topStudents.map((student) => (
                      <div key={student.id} className="student-item-mini">
                        <div className="student-avatar-mini">{student.avatar}</div>
                        <div className="student-info-text">
                          <p className="student-name-mini">{student.name}</p>
                          <p className="student-grade-mini">{student.score}</p>
                        </div>
                        <Star size={12} color="#f6c23e" fill="#f6c23e" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
} 