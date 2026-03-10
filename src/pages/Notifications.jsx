import React, { useState } from 'react';
import { 
  Search, Trash2, CheckCircle, Send, 
  Paperclip, Archive, MessageSquare, Inbox,
  Clock, Filter, User
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Notifications.css';

const mockNotifications = [
  {
    id: 1,
    sender: "Mr. Robert Fox",
    role: "PARENT",
    subject: "Inquiry regarding Grade 10 Fees",
    message: "Hello Admin, I would like to clarify the breakdown for the laboratory fees in the second term invoice. It seems slightly higher than the previous session. Could you please provide a detailed list of what this covers? \n\nI also noticed that the extracurricular fee was charged twice. Please look into this at your earliest convenience.",
    time: "10:24 AM",
    unread: true,
    category: "Parents"
  },
  {
    id: 2,
    sender: "Ms. Sarah Jenkins",
    role: "TEACHER",
    subject: "Leave Application - Medical",
    message: "Dear Principal, I am writing to request a medical leave for tomorrow as I have a scheduled doctor's appointment. I have arranged for Mr. Smith to cover my first period classes. \n\nI will ensure that all lesson plans are uploaded to the portal by this evening so the students don't fall behind.",
    time: "09:15 AM",
    unread: false,
    category: "Teachers"
  },
  {
    id: 3,
    sender: "Security Dept",
    role: "STAFF",
    subject: "Maintenance Alert: Gate 2",
    message: "The electronic sensor at Gate 2 is malfunctioning. Maintenance team has been notified, but please advise staff to use Gate 1 for now. \n\nWe expect the repair to be completed by 4:00 PM today. Security personnel will be stationed at the faulty gate to redirect traffic manually in the meantime.",
    time: "Yesterday",
    unread: false,
    category: "Staff"
  },
  // Adding duplicates to demonstrate scrolling
  { id: 4, sender: "Admin System", role: "STAFF", subject: "Backup Successful", message: "System backup completed.", time: "2 days ago", unread: false, category: "Staff" },
  { id: 5, sender: "Dr. Aristhone", role: "PARENT", subject: "Sports Day", message: "Will there be sports day this year?", time: "3 days ago", unread: false, category: "Parents" },
];

export default function Notifications() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMsg, setSelectedMsg] = useState(mockNotifications[0]);

  const filteredMessages = mockNotifications.filter(msg => {
    const matchesCategory = activeCategory === 'All' || msg.category === activeCategory;
    const matchesSearch = msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <div className="notifications-container">
            
            {/* INBOX SIDEBAR */}
            <aside className="inbox-sidebar">
              <div className="sidebar-static-top">
                <div className="inbox-header">
                  <div className="header-title-row">
                     <Inbox size={20} className="text-blue" />
                     <h3>Messages</h3>
                  </div>
                  <span className="unread-count">
                    {mockNotifications.filter(m => m.unread).length} New
                  </span>
                </div>

                {/* FIXED SEARCH BOX */}
                <div className="search-box-wrapper">
                  <div className="modern-search-bar">
                    <Search size={18} className="search-icon" />
                    <input 
                      type="text" 
                      placeholder="Search name or subject..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button className="clear-search" onClick={() => setSearchTerm('')}>
                        <MoreHorizontal size={14} /> {/* Or a simple 'X' icon */}
                      </button>
                    )}
                  </div>
                </div>

                <div className="category-filter">
                  {['All', 'Parents', 'Teachers', 'Staff'].map(cat => (
                    <button 
                      key={cat}
                      className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* SCROLLABLE LIST AREA */}
              <div className="message-stream-scrollable">
                {filteredMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`msg-card ${selectedMsg?.id === msg.id ? 'selected' : ''} ${msg.unread ? 'unread' : ''}`}
                    onClick={() => setSelectedMsg(msg)}
                  >
                    {msg.unread && <div className="msg-dot"></div>}
                    <div className="msg-info">
                      <div className="msg-top">
                        <span className="sender-name">{msg.sender}</span>
                        <span className="msg-date">{msg.time}</span>
                      </div>
                      <p className="msg-snippet">{msg.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* READING PANE */}
            <section className="message-view">
              {selectedMsg ? (
                <>
                  <div className="view-toolbar">
                    <div className="toolbar-left">
                      <button className="btn-icon-action" title="Archive"><Archive size={18}/></button>
                      <button className="btn-icon-action delete" title="Delete"><Trash2 size={18}/></button>
                    </div>
                    <div className="toolbar-right">
                      <button className="btn-success">
                        <CheckCircle size={16}/> <span>Mark Resolved</span>
                      </button>
                    </div>
                  </div>

                  {/* SCROLLABLE CONTENT AREA */}
                  <div className="view-body-scrollable animate-fade-in">
                    <div className="view-header">
                      <div className="sender-avatar">{selectedMsg.sender[0]}</div>
                      <div className="sender-details">
                        <h2>{selectedMsg.subject}</h2>
                        <div className="sender-sub">
                          <span className="role-indicator">{selectedMsg.role}</span>
                          <span className="divider">•</span>
                          <span className="sender-id">{selectedMsg.sender}</span>
                        </div>
                      </div>
                    </div>

                    <div className="message-content">
                      <p>{selectedMsg.message}</p>
                    </div>

                    <div className="reply-container">
                      <div className="reply-editor">
                        <textarea placeholder={`Type a reply to ${selectedMsg.sender}...`}></textarea>
                        <div className="editor-footer">
                          <button className="btn-icon-action" title="Attach"><Paperclip size={18}/></button>
                          <button className="btn-primary">
                            <span>Send Reply</span>
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="view-empty">
                  <MessageSquare size={48} />
                  <h3>No message selected</h3>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

