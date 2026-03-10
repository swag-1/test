
import React, { useState, useEffect } from 'react';
import { 
  Clock, User, MapPin, LayoutGrid, List, 
  BookOpen, Atom, Languages, Palette, Binary,
  FlaskConical, Music, Shield, Microscope,
  ChevronLeft, ChevronRight // Added for the collapse toggle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Lessons.css';

const categories = [
  { id: 'all', name: 'All Subjects', icon: <BookOpen size={18} /> },
  { id: 'science', name: 'Science', icon: <FlaskConical size={18} /> },
  { id: 'math', name: 'Mathematics', icon: <Binary size={18} /> },
  { id: 'arts', name: 'Arts & Music', icon: <Palette size={18} /> },
  { id: 'humanities', name: 'Humanities', icon: <Languages size={18} /> },
  { id: 'sports', name: 'Sports', icon: <Shield size={18} /> },
];

const lessonsData = [
  { id: 1, category: 'math', subject: "Elective Math Revision", teacher: "Dr. Kwesi Appiah", room: "Annex Block Rm 4", class: "Basic 12-A", start: "05:00", end: "06:30", icon: <BookOpen />, color: "#4e73df" },
  { id: 2, category: 'science', subject: "Integrated Science", teacher: "Prof. Kofi Antwi", room: "Lab 204", class: "Basic 10-A", start: "08:00", end: "09:30", icon: <Atom />, color: "#1cc88a" },
  { id: 3, category: 'humanities', subject: "English Literature", teacher: "Akua Afriyie", room: "Assembly Hall", class: "Basic 12-C", start: "08:30", end: "10:00", icon: <Languages />, color: "#f6c23e" },
  { id: 4, category: 'ict', subject: "Introduction to ICT", teacher: "Yaw Gyamfi", room: "Comp Lab 1", class: "Basic 11-B", start: "09:00", end: "10:30", icon: <Binary />, color: "#36b9cc" },
  { id: 5, category: 'arts', subject: "Creative Arts", teacher: "Naa Lamiley", room: "Art Studio", class: "Basic 9-A", start: "11:00", end: "12:30", icon: <Palette />, color: "#e74a3b" },
  { id: 6, category: 'science', subject: "Biology Seminar", teacher: "Prof. Kofi Antwi", room: "Science Lab 101", class: "Basic 11-A", start: "14:00", end: "15:30", icon: <Microscope />, color: "#6f42c1" },
];

export default function Lessons() {
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // ADDED: State for collapsible sidebar
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatus = (start, end) => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    const startTotal = sH * 60 + sM;
    const endTotal = eH * 60 + eM;

    if (now >= startTotal && now < endTotal) return { type: 'ongoing', remaining: endTotal - now };
    if (now < startTotal) return { type: 'upcoming', remaining: null };
    return { type: 'ended', remaining: null };
  };

  const filteredLessons = activeCategory === 'all' 
    ? lessonsData 
    : lessonsData.filter(l => l.category === activeCategory);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content lessons-page-layout">
          
          {/* COLLAPSIBLE CATEGORY SIDEBAR */}
          <aside className={`category-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
              {!isCollapsed && <h4 className="sidebar-title">Categories</h4>}
              <button className="collapse-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>
            
            <div className="category-list">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`category-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  title={isCollapsed ? cat.name : ""}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  {!isCollapsed && <span className="cat-name">{cat.name}</span>}
                </button>
              ))}
            </div>
          </aside>

          {/* MAIN LESSONS AREA */}
          <section className="lessons-display-area">
            <div className="page-title-row">
              <div>
                <h2 className="page-heading">Live Lessons</h2>
                <p className="page-subheading">Viewing {activeCategory.replace(/^\w/, c => c.toUpperCase())} schedule</p>
              </div>
              
              <div className="header-actions-group">
                <div className="view-toggle-container">
                  <button className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><LayoutGrid size={16} /></button>
                  <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={16} /></button>
                </div>
                <div className="current-time-badge dark">
                  <Clock size={14} />
                  <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            <div className={`lessons-grid-system ${viewMode}-layout`}>
              {filteredLessons.map((lesson) => {
                const status = getStatus(lesson.start, lesson.end);
                return (
                  <div key={lesson.id} className={`lesson-card ${status.type}`}>
                    <div className="lesson-header">
                      <div className="subject-icon-box" style={{ backgroundColor: `${lesson.color}15`, color: lesson.color }}>
                        {lesson.icon}
                      </div>
                      <span className={`status-tag ${status.type}`}>
                        {status.type === 'ongoing' && <span className="pulse-dot" />}
                        {status.type}
                      </span>
                    </div>

                    <div className="lesson-body">
                      <h3 className="lesson-subject">{lesson.subject}</h3>
                      <span className="class-badge-mini">{lesson.class}</span>
                      
                      <div className="lesson-details">
                        <div className="detail-item"><User size={14} /> {lesson.teacher}</div>
                        <div className="detail-item"><MapPin size={14} /> {lesson.room}</div>
                        <div className="detail-item"><Clock size={14} /> {lesson.start} - {lesson.end}</div>
                      </div>
                    </div>

                    {status.type === 'ongoing' && (
                      <div className="ongoing-footer">
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{ width: '45%' }}></div>
                        </div>
                        <div className="countdown-display">
                          <span className="ends-text">Ends in:</span>
                          <span className="time-left">{status.remaining}m</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}