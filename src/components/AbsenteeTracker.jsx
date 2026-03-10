import React from 'react';
import { Users, CheckCircle2, Phone, Clock, MoreVertical } from 'lucide-react';

const absenteeLogs = [
  { id: 1, student: "Kofi Mensah", class: "Grade 10-B", parent: "James Mensah", phone: "+233 50 123 4567", time: "08:15 AM", status: "Delivered" },
  { id: 2, student: "Amara Okafor", class: "Grade 12-A", parent: "Linda Okafor", phone: "+233 24 888 9991", time: "08:22 AM", status: "Delivered" },
  { id: 3, student: "Kwame Boateng", class: "Grade 9-C", parent: "Seth Boateng", phone: "+233 55 444 2221", time: "08:45 AM", status: "Pending" },
  { id: 4, student: "Sarah Quansah", class: "Grade 11-B", parent: "Mary Quansah", phone: "+233 20 111 3334", time: "09:02 AM", status: "Delivered" }
];

export default function AbsenteeTracker() {
  return (
    <div className="absentee-tracker-container">
      <div className="tracker-header">
        <div className="tracker-title-group">
          <div className="pulse-icon-red">
            <Users size={20} />
          </div>
          <div>
            <h4>Attendance Sentinel Feed</h4>
            <p>Live SMS transmission log for today</p>
          </div>
        </div>
        <div className="count-chip">{absenteeLogs.length} Alerts Sent</div>
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
                <span className="parent-name">Parent: {log.parent}</span>
                <span className="dot-sep">•</span>
                <span className="phone-link"><Phone size={10} /> {log.phone}</span>
              </div>

              <div className="transmission-footer">
                <div className={`delivery-badge ${log.status.toLowerCase()}`}>
                  {log.status === "Delivered" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {log.status} at {log.time}
                </div>
                <button className="btn-resend">Resend</button>
              </div>
            </div>
            
            <button className="action-menu-dots">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}