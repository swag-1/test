import React, { useState } from 'react';
import { 
  Send, Users, User, Mail, MessageSquare, Search, 
  Sparkles, Settings, BellRing, FileText, ChevronRight,
  CheckCircle2, Phone, Clock, MoreVertical 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './MessageCenter.css';

/** * COMPONENT: AbsenteeTracker
 * Displays live transmission logs for student absenteeism alerts
 */
const AbsenteeTracker = () => {
  const absenteeLogs = [
    { id: 1, student: "Kofi Mensah", class: "Grade 10-B", parent: "James Mensah", phone: "+233 50 123 4567", time: "08:15 AM", status: "Delivered" },
    { id: 2, student: "Amara Okafor", class: "Grade 12-A", parent: "Linda Okafor", phone: "+233 24 888 9991", time: "08:22 AM", status: "Delivered" },
    { id: 3, student: "Kwame Boateng", class: "Grade 9-C", parent: "Seth Boateng", phone: "+233 55 444 2221", time: "08:45 AM", status: "Pending" },
  ];

  return (
    <div className="absentee-tracker-container">
      <div className="tracker-header">
        <div className="tracker-title-group">
          <div className="pulse-icon-red"><Users size={20} /></div>
          <div>
            <h4>Attendance Sentinel</h4>
            <p>Today's automated SMS log</p>
          </div>
        </div>
        <div className="count-chip">{absenteeLogs.length} Alerts</div>
      </div>

      <div className="tracker-scroll-body">
        {absenteeLogs.map((log) => (
          <div className="absentee-card" key={log.id}>
            <div className="absentee-avatar-box">
              <span>{log.student.charAt(0)}</span>
              <div className="status-indicator-mini" data-status={log.status}></div>
            </div>
            <div className="absentee-content">
              <div className="absentee-top-row">
                <span className="student-name">{log.student}</span>
                <span className="class-pill">{log.class}</span>
              </div>
              <div className="parent-detail-row">
                <span>{log.parent}</span>
                <span className="dot-sep">•</span>
                <span className="phone-link"><Phone size={10} /> {log.phone}</span>
              </div>
              <div className="transmission-footer">
                <div className={`delivery-badge ${log.status.toLowerCase()}`}>
                  {log.status === "Delivered" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {log.status} • {log.time}
                </div>
                <button className="btn-resend-mini">Resend</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** * MAIN PAGE: MessageCenter
 */
export default function MessageCenter() {
  const [targetType, setTargetType] = useState('bulk'); // 'bulk' or 'single'
  const [channel, setChannel] = useState('sms'); // 'sms' or 'email'
  const [message, setMessage] = useState("");

  const templates = {
    attendance: "Dear Parent, {student_name} was marked ABSENT from school today, Jan 30, 2026. Please contact the office for details.",
    exam: "Hello {parent_name}, Exam reports for {student_name} are ready. Download them via the portal or visit the front desk.",
    fees: "Urgent: Dear Parent, {student_name} has an outstanding fee balance. Please settle by Friday to avoid penalties.",
    holiday: "Notice: School will be closed on Feb 2nd for the regional holiday. Classes resume on Tuesday. Enjoy the break!"
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <div className="msg-layout-grid">
            
            {/* LEFT: COMPOSER CARD */}
            <div className="composer-card-premium">
              <div className="card-header-v4">
                <div className="header-icon-gradient"><Sparkles size={24} color="#fff" /></div>
                <div className="header-text">
                  <h3>Communication Hub</h3>
                  <p>Send bulk SMS or individual reports</p>
                </div>
                <div className="msg-status-badge">
                  <div className="status-dot-green"></div> Online
                </div>
              </div>

              <div className="composer-body">
                {/* Target Toggle */}
                <div className="toggle-group-modern">
                  <button className={targetType === 'bulk' ? 'active-bulk' : ''} onClick={() => setTargetType('bulk')}>
                    <Users size={18} /> <span>Bulk Broadcast</span>
                  </button>
                  <button className={targetType === 'single' ? 'active-individual' : ''} onClick={() => setTargetType('single')}>
                    <User size={18} /> <span>Individual</span>
                  </button>
                </div>

                {/* Channel Selector */}
                <div className="channel-selection-row">
                  <div className={`channel-pill sms ${channel === 'sms' ? 'active' : ''}`} onClick={() => setChannel('sms')}>
                    <MessageSquare size={20} /> <span>SMS Portal</span>
                  </div>
                  <div className={`channel-pill email ${channel === 'email' ? 'active' : ''}`} onClick={() => setChannel('email')}>
                    <Mail size={20} /> <span>Email Engine</span>
                  </div>
                </div>

                {/* Search / Recipient Selection */}
                <div className="form-section-modern">
                  <label>Search Recipient</label>
                  <div className="search-glass-wrapper">
                    <Search size={18} className="search-icon-active" />
                    <input type="text" className="premium-search-input" placeholder="Search parents, students, or phone numbers..." />
                    <div className="search-shortcut">Ctrl + K</div>
                  </div>
                </div>

                {/* Template Chips */}
                <div className="form-section-modern">
                  <label>Smart Templates</label>
                  <div className="template-scroll">
                    {Object.keys(templates).map(key => (
                      <button key={key} className={`tpl-chip ${key}`} onClick={() => setMessage(templates[key])}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Editor */}
                <div className="message-area-wrapper">
                  <div className="textarea-header">
                    <span>Message Body</span>
                    <span className="char-count">{message.length} / 160</span>
                  </div>
                  <textarea 
                    className="modern-textarea" 
                    rows="6" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here or pick a template..."
                  ></textarea>
                </div>

                <button className="btn-send-rainbow" onClick={() => alert("Messages are being deployed!")}>
                  <span>Deploy Message Now</span>
                  <Send size={20} />
                </button>
              </div>
            </div>

            {/* RIGHT: SENTINEL & FEED */}
            <div className="msg-side-panel">
              <div className="auto-attendance-glass-card">
                <div className="glass-header">
                  <div className="live-pulse"></div>
                  <h4>Attendance Sentinel</h4>
                  <Settings size={18} className="glass-settings" />
                </div>
                <p className="glass-desc">Automated absentee alerts are active for all sessions.</p>
                <div className="glass-stats-grid">
                  <div className="g-stat"><p>Today</p><h3>48</h3></div>
                  <div className="g-stat highlight"><p>Uptime</p><h3>100%</h3></div>
                </div>
              </div>

              {/* Injected AbsenteeTracker Component */}
              <AbsenteeTracker />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}