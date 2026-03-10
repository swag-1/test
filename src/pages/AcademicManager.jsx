import React, { useState } from 'react';
import { 
  BookOpen, Calendar, GraduationCap, LayoutGrid, ClipboardList, 
  Settings, Users, CheckCircle2, AlertCircle, Plus, Search,
  ChevronRight, BarChart3, Clock, MapPin, Download
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Academics.css';

export default function AcademicManager() {
  const [activeTab, setActiveTab] = useState('curriculum');

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          
          <div className="academics-header">
            <div className="title-stack">
              <h2 className="premium-title">Academic Command Center</h2>
              <p className="subtitle">Curriculum Engineering & Pedagogical Oversight</p>
            </div>
            
            <div className="academic-session-pill">
              <Calendar size={16} />
              <span>Session: 2025/2026 • Term 1</span>
            </div>
          </div>

          {/* MAIN MODULE NAVIGATION */}
          <nav className="academic-nav-tabs">
            <button className={activeTab === 'curriculum' ? 'active' : ''} onClick={() => setActiveTab('curriculum')}>
              <BookOpen size={18} /> Curriculum
            </button>
            <button className={activeTab === 'exams' ? 'active' : ''} onClick={() => setActiveTab('exams')}>
              <ClipboardList size={18} /> Assessments
            </button>
            <button className={activeTab === 'timetable' ? 'active' : ''} onClick={() => setActiveTab('timetable')}>
              <LayoutGrid size={18} /> Timetables
            </button>
            <button className={activeTab === 'promotion' ? 'active' : ''} onClick={() => setActiveTab('promotion')}>
              <GraduationCap size={18} /> Promotion Logic
            </button>
          </nav>

          <div className="academic-workspace animate-fade-in">
            {activeTab === 'curriculum' && <CurriculumModule />}
            {activeTab === 'exams' && <ExamSuite />}
            {activeTab === 'promotion' && <PromotionManager />}
          </div>

        </main>
      </div>
    </div>
  );
}

/* --- SUB-MODULE: CURRICULUM --- */
const CurriculumModule = () => (
  <div className="module-grid">
    <div className="curriculum-sidebar">
      <div className="search-box-mini">
        <Search size={14} />
        <input type="text" placeholder="Search Subjects..." />
      </div>
      <div className="hierarchy-list">
        <div className="h-item active">Grade 10 <ChevronRight size={14} /></div>
        <div className="h-item">Grade 11 <ChevronRight size={14} /></div>
        <div className="h-item">Grade 12 <ChevronRight size={14} /></div>
      </div>
    </div>

    <div className="curriculum-content">
      <div className="content-header">
        <h3>Mathematics (Core)</h3>
        <button className="btn-add-sm"><Plus size={16} /> Add Unit</button>
      </div>
      
      <div className="syllabus-stack">
        <SyllabusCard unit="Unit 1" title="Advanced Algebra" chapters={5} progress={100} status="Completed" />
        <SyllabusCard unit="Unit 2" title="Trigonometric Functions" chapters={8} progress={40} status="In Progress" />
        <SyllabusCard unit="Unit 3" title="Calculus Foundations" chapters={12} progress={0} status="Pending" />
      </div>
    </div>
  </div>
);

const SyllabusCard = ({ unit, title, chapters, progress, status }) => (
  <div className="syllabus-card">
    <div className="card-top">
      <span className="unit-label">{unit}</span>
      <span className={`status-pill ${status.replace(" ", "-").toLowerCase()}`}>{status}</span>
    </div>
    <h4>{title}</h4>
    <p>{chapters} Chapters mapped to this syllabus</p>
    <div className="progress-container">
      <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: `${progress}%`}}></div></div>
      <span>{progress}%</span>
    </div>
  </div>
);

/* --- SUB-MODULE: EXAMS --- */
const ExamSuite = () => (
  <div className="exam-grid">
    <div className="suite-card">
      <div className="card-icon indigo"><Clock size={20} /></div>
      <h4>Exam Scheduling</h4>
      <p>Automated timetable generator with conflict detection.</p>
      <button className="btn-action">Launch Scheduler</button>
    </div>
    <div className="suite-card">
      <div className="card-icon emerald"><Settings size={20} /></div>
      <h4>Grade Scales</h4>
      <p>Current: $A=90-100, B=80-89$. Configure GPA weightings.</p>
      <button className="btn-action">Configure</button>
    </div>
    <div className="suite-card">
      <div className="card-icon rose"><AlertCircle size={20} /></div>
      <h4>Assessment Builder</h4>
      <p>Create digital quizzes with auto-grading features.</p>
      <button className="btn-action">Create Form</button>
    </div>
  </div>
);

/* --- SUB-MODULE: PROMOTION --- */
const PromotionManager = () => (
  <div className="promotion-panel">
    <div className="promotion-header">
      <div className="p-info">
        <h3>Year-End Promotion Manager</h3>
        <p>Criteria: Minimum Avg Score ≥ 50% & Zero Attendance Defaults</p>
      </div>
      <button className="btn-primary-indigo"><Download size={16} /> Export Draft</button>
    </div>

    <table className="promotion-table">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Avg Score</th>
          <th>Attendance</th>
          <th>Eligibility</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* Replace the <tr> in your PromotionManager with this */}
      <tr>
        <td data-label="Student">Kwame Boateng</td>
        <td data-label="Avg Score">88.4%</td>
        <td data-label="Attendance">96%</td>
        <td data-label="Eligibility"><span className="elig-pass">Passed</span></td>
        <td data-label="Action"><button className="btn-promote">Review</button></td>
      
          <td>Sarah Quansah</td>
          <td>42.1%</td>
          <td>70%</td>
          <td><span className="elig-fail">Flagged</span></td>
          <td><button className="btn-promote">Retention Docs</button></td>
        </tr>
      </tbody>
    </table>
  </div>
);