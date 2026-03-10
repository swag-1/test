import React from 'react';
import { Printer, Download, Award, TrendingUp, Calendar, Hash } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './StudentReport.css';

const performanceHistory = [
  { term: 'Term 1', gpa: 3.2 },
  { term: 'Term 2', gpa: 3.5 },
  { term: 'Term 3', gpa: 3.8 },
];

const termlyData = [
  { subject: 'Advanced Mathematics', t1: 78, t2: 85, t3: 92, weight: '1.0' },
  { subject: 'Quantum Physics', t1: 82, t2: 80, t3: 88, weight: '1.0' },
  { subject: 'English Literature', t1: 88, t2: 86, t3: 85, weight: '0.5' },
  { subject: 'World History', t1: 70, t2: 75, t3: 78, weight: '0.5' },
  { subject: 'Organic Chemistry', t1: 90, t2: 92, t3: 95, weight: '1.0' },
];

export default function StudentReport() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content report-bg">
          
          <div className="report-controls no-print">
  <div className="title-stack">
    <h2 className="report-main-title">Academic Performance Transcript</h2>
    <p>Official Session: 2025/2026</p>
  </div>
  <div className="action-buttons">
    <button className="btn-print" onClick={() => window.print()}>
      <Printer size={18} /> 
      <span>Print Transcript</span>
    </button>
    <button className="btn-export">
      <Download size={18} /> 
      <span>Export PDF</span>
    </button>
  </div>
</div>

          <div className="official-report-card">
            {/* watermark decoration */}
            <div className="watermark">BEACON</div>

            <div className="transcript-header">
              <div className="institution-info">
                <div className="inst-logo">B</div>
                <div>
                  <h3>BEACON ACADEMY INTERNATIONAL</h3>
                  <p>122 Education Way, Science District</p>
                  <p className="contact-small">contact@beacon.edu | +1 234 567 890</p>
                </div>
              </div>
              <div className="transcript-status">
                <span className="status-badge">OFFICIAL TRANSCRIPT</span>
              </div>
            </div>

            <div className="student-info-grid">
              <div className="info-block"><label>Student Name</label><span>Appiah Johnson</span></div>
              <div className="info-block"><label>Student ID</label><span>STD009</span></div>
              <div className="info-block"><label>Current Grade</label><span>BASIC 5 -  B</span></div>
              <div className="info-block"><label>Ranking</label><span>4th / 120 Students</span></div>
            </div>

            <div className="performance-summary-row">
              <div className="summary-card">
                <TrendingUp size={20} className="text-blue" />
                <div>
                  <label>Cumulative GPA</label>
                  <h4>3.82 / 4.0</h4>
                </div>
              </div>
              <div className="summary-card">
                <Award size={20} className="text-green" />
                <div>
                  <label>Academic Standing</label>
                  <h4>Dean's List</h4>
                </div>
              </div>
              <div className="summary-card">
                <Calendar size={20} className="text-orange" />
                <div>
                  <label>Attendance</label>
                  <h4>96.4%</h4>
                </div>
              </div>
            </div>

            <div className="report-body">
              <h5 className="section-label">TERMLY PERFORMANCE MATRIX</h5>
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th>Subject Description</th>
                    <th>Weight</th>
                    <th>Term 1</th>
                    <th>Term 2</th>
                    <th>Term 3</th>
                    <th>Average</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {termlyData.map((row, i) => {
                    const avg = ((row.t1 + row.t2 + row.t3) / 3).toFixed(1);
                    return (
                      <tr key={i}>
                        <td className="subject-name">{row.subject}</td>
                        <td>{row.weight}</td>
                        <td className="score-cell">{row.t1}</td>
                        <td className="score-cell">{row.t2}</td>
                        <td className="score-cell highlight">{row.t3}</td>
                        <td className="avg-cell">{avg}%</td>
                        <td><span className="pass-pill">PASS</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="visual-analytics">
              <div className="gpa-trend-container">
                <h5 className="section-label">GPA PROGRESSION TREND</h5>
                <div style={{ width: '100%', height: 180 }}>
                  <ResponsiveContainer>
                    <AreaChart data={performanceHistory}>
                      <defs>
                        <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4e73df" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4e73df" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="term" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                      <YAxis hide domain={[0, 4]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="gpa" stroke="#4e73df" strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grading-key">
                <h5 className="section-label">GRADING SCALE</h5>
                <div className="key-grid">
                  <div><span>90-100</span><strong>A (Excellent)</strong></div>
                  <div><span>80-89</span><strong>B (Good)</strong></div>
                  <div><span>70-79</span><strong>C (Satisfactory)</strong></div>
                  <div><span>Below 60</span><strong>F (Fail)</strong></div>
                </div>
              </div>
            </div>

            <div className="signature-area">
              <div className="sig-block">
                <div className="sig-line"></div>
                <p>Class Teacher</p>
              </div>
              <div className="sig-block">
                <div className="sig-line"></div>
                <p>Principal's Signature</p>
              </div>
              <div className="seal">OFFICIAL SEAL</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}