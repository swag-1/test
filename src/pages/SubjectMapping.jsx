import React, { useState } from 'react';
import { 
  BookOpen, UserCheck, LayoutGrid, Filter, 
  X, AlertTriangle, Plus, Search, Trash2, ChevronLeft, ChevronRight, Settings2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './SubjectMapping.css';

const initialMappings = [
  { id: 1, class: "Basic 10-A", subject: "Elective Mathematics", code: "E-MATH101", teacher: "Dr. Kwesi Appiah", hours: 6, type: "Elective" },
  { id: 2, class: "Basic 11-B", subject: "Physics", code: "PHY202", teacher: "Prof. Kofi Antwi", hours: 4, type: "Core" },
  { id: 3, class: "Basic 10-A", subject: "English Language", code: "ENG105", teacher: "Akua Afriyie", hours: 5, type: "Core" },
  { id: 4, class: "Basic 12-C", subject: "Social Studies", code: "SOC303", teacher: "Mrs. Faustina Mensah", hours: 3, type: "Core" },
];

export default function SubjectMapping() {
  const [mappings, setMappings] = useState(initialMappings);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [formData, setFormData] = useState({
    classId: '', subjectId: '', teacherId: '', type: 'Core', hours: ''
  });

  // DELETE LOGIC
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      setMappings(mappings.filter(m => m.id !== id));
    }
  };

  const handleAssign = (e) => {
    e.preventDefault();
    const newMapping = {
      id: Date.now(),
      class: formData.classId,
      subject: formData.subjectId,
      code: "NEW-001",
      teacher: formData.teacherId,
      hours: formData.hours,
      type: formData.type
    };
    setMappings([newMapping, ...mappings]);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className={`main-content subject-mapping-layout ${!isPanelOpen ? 'panel-collapsed' : ''}`}>
          
          {/* A. COLLAPSIBLE ASSIGNMENT PANEL */}
          <aside className={`assignment-panel ${!isPanelOpen ? 'collapsed' : ''}`}>
            <button className="collapse-toggle" onClick={() => setIsPanelOpen(!isPanelOpen)}>
              {isPanelOpen ? <ChevronLeft size={18} /> : <Plus size={18} />}
            </button>
            
            <div className="panel-content">
              <div className="panel-header">
                <Settings2 size={20} className="icon-blue" />
                <h3>Assign Subject</h3>
              </div>
              
              <form onSubmit={handleAssign} className="mapping-form">
                <div className="form-group">
                  <label>Target Class</label>
                  <select onChange={(e) => setFormData({...formData, classId: e.target.value})}>
                    <option>Select Class...</option>
                    <option>Grade 10-A</option>
                    <option>Grade 11-B</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select onChange={(e) => setFormData({...formData, subjectId: e.target.value})}>
                    <option>Select Subject...</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign Teacher</label>
                  <select onChange={(e) => setFormData({...formData, teacherId: e.target.value})}>
                    <option>Select Teacher...</option>
                    <option>Dr. Aris</option>
                    <option>Sarah Jenkins</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Weekly Hours</label>
                    <input type="number" placeholder="5" onChange={(e) => setFormData({...formData, hours: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Type</label>
                    <select onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      <option value="Core">Core</option>
                      <option value="Elective">Elective</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="assign-submit-btn">Assign Teacher</button>
              </form>
            </div>
          </aside>

          {/* B. VIEW AREA */}
          <section className="view-panel">
            <div className="view-header">
              <div className="search-box">
                <Search size={18} />
                <input type="text" placeholder="Search by class or teacher..." />
              </div>
              {/* BEAUTIFIED ADVANCED FILTER BUTTON */}
              <button className="btn-advanced-filter">
                <div className="filter-content">
                  <Filter size={16} />
                  <span>Advanced Filters</span>
                </div>
                <div className="filter-badge">{mappings.length}</div>
              </button>
            </div>

            <div className="table-container">
              <table className="mapping-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Hours</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mappings.map(m => (
                    <tr key={m.id} className="mapping-row">
                      <td><span className="class-tag">{m.class}</span></td>
                      <td>
                        <div className="sub-info">
                          <span className="sub-name">{m.subject}</span>
                          <span className="sub-code">{m.code}</span>
                        </div>
                      </td>
                      <td>
                        <div className="teacher-cell">
                          <div className="teacher-avatar">{m.teacher.charAt(0)}</div>
                          {m.teacher}
                        </div>
                      </td>
                      <td><strong>{m.hours}h</strong></td>
                      <td><span className={`type-tag ${m.type.toLowerCase()}`}>{m.type}</span></td>
                      <td>
                        <button className="delete-action-btn" onClick={() => handleDelete(m.id)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}