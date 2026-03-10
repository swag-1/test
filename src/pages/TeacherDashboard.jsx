import React, { useState } from 'react';
import { 
  LayoutGrid, Users, MessageSquare, Bell, Clock, 
  Plus, ClipboardCheck, ChevronRight, Gift, FileSpreadsheet, 
  ChevronDown, Send, Check, AlertCircle
} from 'lucide-react';
import './TeacherDashboard.css';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [markType, setMarkType] = useState('Exercise');
  const [attendance, setAttendance] = useState({});

  const students = [
    { id: 101, name: 'Ama Mensah', roll: '2024-01' },
    { id: 102, name: 'John Doe', roll: '2024-02' },
    { id: 103, name: 'Sarah Smith', roll: '2024-03' },
    { id: 104, name: 'Kofi Aris', roll: '2024-04' },
  ];

  const markAllPresent = () => {
    const allP = {};
    students.forEach(s => allP[s.id] = 'P');
    setAttendance(allP);
  };

  return (
    <div className="app-container">
      {/* FIXED HEADER */}
      <header className="top-nav">
        <div className="brand">
          <div className="logo-square">B</div>
          <h2>Beacon <span>Portal</span></h2>
        </div>
        <div className="top-actions">
          <div className="icon-badge"><Bell size={20} /><span className="dot" /></div>
         <a href="/"> <div className="avatar-circle">S</div></a>
  
        </div>
      </header>

      {/* SCROLLABLE CONTENT */}
      <main className="scroll-area">
        {activeTab === 'home' && (
          <div className="view">
            <div className="welcome-banner">
              <div className="status-badge"><span className="pulse" /> Live Session</div>
              <h1>Biology: Grade 10-B</h1>
              <p><Clock size={14} /> Ends in 18 minutes</p>
            </div>

            <div className="quick-grid">
              <button className="q-card indigo" onClick={() => setActiveTab('classes')}>
                <Users /> <span>Attendance</span>
              </button>
              <button className="q-card emerald" onClick={() => setActiveTab('marks')}>
                <FileSpreadsheet /> <span>Marks</span>
              </button>
              <button className="q-card amber" onClick={() => setActiveTab('inbox')}>
                <MessageSquare /> <span>Inbox</span>
              </button>
            </div>

            <div className="upcoming-list">
              <h3>Upcoming Tasks</h3>
              <div className="task-tile">
                <Gift className="text-pink" />
                <p><strong>Ama Mensah's</strong> birthday today</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="view">
            <div className="view-header">
              <h3>Attendance Register</h3>
              <button className="bulk-link" onClick={markAllPresent}><Check size={14}/> Mark All</button>
            </div>
            <div className="list-wrapper">
              {students.map(s => (
                <div key={s.id} className="student-card">
                  <div className="s-name">
                    <strong>{s.name}</strong>
                    <span>{s.roll}</span>
                  </div>
                  <div className="btn-group">
                    <button className={`at-bt p ${attendance[s.id]==='P'?'active':''}`} onClick={()=>setAttendance({...attendance, [s.id]:'P'})}>P</button>
                    <button className={`at-bt a ${attendance[s.id]==='A'?'active':''}`} onClick={()=>setAttendance({...attendance, [s.id]:'A'})}>A</button>
                    <button className={`at-bt l ${attendance[s.id]==='L'?'active':''}`} onClick={()=>setAttendance({...attendance, [s.id]:'L'})}>L</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="main-cta indigo">Confirm Register</button>
          </div>
        )}

        {activeTab === 'marks' && (
          <div className="view">
             <div className="view-header">
              <h3>Student Marks</h3>
              <div className="selector">
                <select onChange={(e) => setMarkType(e.target.value)}>
                  <option>Exercise</option>
                  <option>Class Test</option>
                  <option>Exams</option>
                </select>
                <ChevronDown size={14} />
              </div>
            </div>
            <div className="list-wrapper">
              {students.map(s => (
                <div key={s.id} className="student-card">
                  <strong>{s.name}</strong>
                  <input type="number" className="score-field" placeholder="00" />
                </div>
              ))}
            </div>
            <button className="main-cta emerald">Save {markType}</button>
          </div>
        )}

        {activeTab === 'inbox' && (
          <div className="view">
            <div className="view-header"><h3>Messages</h3></div>
            <div className="chat-stack">
              <div className="chat-item">
                <div className="chat-meta"><strong>Mrs. Mensah</strong> <span>2m</span></div>
                <p>Is the science project due today?</p>
              </div>
            </div>
            <div className="chat-input-bar">
              <input type="text" placeholder="Type a message..." />
              <button className="send-circle"><Send size={18} /></button>
            </div>
          </div>
        )}
      </main>

      {/* FIXED BOTTOM NAV */}
      <nav className="bottom-bar">
        <button className={activeTab==='home'?'on':''} onClick={()=>setActiveTab('home')}><LayoutGrid/><span>Home</span></button>
        <button className={activeTab==='classes'?'on':''} onClick={()=>setActiveTab('classes')}><Users/><span>Class</span></button>
        <button className={activeTab==='marks'?'on':''} onClick={()=>setActiveTab('marks')}><FileSpreadsheet/><span>Marks</span></button>
        <button className={activeTab==='inbox'?'on':''} onClick={()=>setActiveTab('inbox')}><MessageSquare/><span>Inbox</span></button>
      </nav>
    </div>
  );
}