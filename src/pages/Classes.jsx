import React, { useState } from 'react';
import { 
  Users, UserPlus, TrendingUp, MoreVertical, 
  Search, X, Plus, GraduationCap, ArrowUpRight
} from 'lucide-react';
import { 
  LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid, Legend 
} from 'recharts';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddStudentModal from '../components/AddStudentModal';
import AddClassModal from '../components/AddClassModal';
import './Classes.css';

const initialClasses = [
  { 
    id: 1, name: "Basic 10-A", teacher: "Akua Afriyie", boys: 12, girls: 15, color: "#4e73df",
    performance: [
      { week: 'W1', boys: 65, girls: 70 }, 
      { week: 'W2', boys: 72, girls: 75 }, 
      { week: 'W3', boys: 68, girls: 82 }, 
      { week: 'W4', boys: 85, girls: 88 }
    ],
    students: [
      { id: 1, name: "Kwame Mensah", gender: "Boy", gpa: "3.8" },
      { id: 2, name: "Abena Osei", gender: "Girl", gpa: "3.9" },
      { id: 3, name: "Nii Armah", gender: "Boy", gpa: "3.5" }
    ]
  },
  { 
    id: 2, name: "Basic 11-B", teacher: "Yaw Gyamfi", boys: 10, girls: 14, color: "#1cc88a",
    performance: [
      { week: 'W1', boys: 80, girls: 78 }, 
      { week: 'W2', boys: 75, girls: 82 }, 
      { week: 'W3', boys: 88, girls: 85 }, 
      { week: 'W4', boys: 92, girls: 94 }
    ],
    students: [
      { id: 4, name: "Abdul-Rahman Issah", gender: "Boy", gpa: "3.7" },
      { id: 5, name: "Esi Forson", gender: "Girl", gpa: "4.0" }
    ]
  },
  { 
    id: 3, name: "Basic 9-C", teacher: "Naa Lamiley", boys: 15, girls: 12, color: "#f6c23e",
    performance: [
      { week: 'W1', boys: 89, girls: 65 }, 
      { week: 'W2', boys: 62, girls: 60 }, 
      { week: 'W3', boys: 58, girls: 70 }, 
      { week: 'W4', boys: 70, girls: 70 },
      { week: 'W5', boys: 60, girls: 80 },
      { week: 'W6', boys: 70, girls: 76 },
      { week: 'W7', boys: 60, girls: 80 },
      { week: 'W8', boys: 60, girls: 80 },
      { week: 'W9', boys: 60, girls: 80 },
      { week: 'W10', boys: 60, girls: 80 },
      { week: 'W11', boys: 60, girls: 80 }
    ],
    students: [
      { id: 6, name: "Kofi Boateng", gender: "Boy", gpa: "3.2" },
      { id: 7, name: "Efua Adjei", gender: "Girl", gpa: "3.6" }
    ]
  }
];

export default function Classes() {
  const [classes, setClasses] = useState(initialClasses);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  // Logic to handle adding a new class to the list
  const handleAddClass = (newClassData) => {
    const newEntry = {
      id: classes.length + 1,
      name: newClassData.name,
      teacher: newClassData.teacher,
      room: newClassData.room,
      color: newClassData.color,
      boys: 0,
      girls: 0,
      performance: [
        { week: 'W1', boys: 0, girls: 0 },
        { week: 'W2', boys: 0, girls: 0 },
        { week: 'W3', boys: 0, girls: 0 },
        { week: 'W4', boys: 0, girls: 0 }
      ],
      students: []
    };
    setClasses([...classes, newEntry]);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <div className="page-title-row">
            <div>
              <h2 className="page-heading">Class Management</h2>
              <p className="page-subheading">Track class demographics and weekly performance</p>
            </div>
            <div className="action-buttons">
              <button className="btn-secondary" onClick={() => setIsAddStudentOpen(true)}>
                <UserPlus size={18} /> Enroll Student
              </button>
              <button className="btn-primary" onClick={() => setIsAddClassOpen(true)}>
                <Plus size={18} /> New Class
              </button>
            </div>
          </div>

          <div className="classes-grid">
            {classes.map((cls) => (
              <div key={cls.id} className="class-card" onClick={() => setSelectedClass(cls)}>
                <div className="class-card-header">
                  <div className="class-info">
                    <h3>{cls.name}</h3>
                    <span className="teacher-name">{cls.teacher}</span>
                  </div>
                  <div className="card-icon-bg" style={{ backgroundColor: `${cls.color}15` }}>
                    <GraduationCap size={20} color={cls.color || "#4e73df"} />
                  </div>
                </div>

                <div className="stats-container">
                  <div className="stat-pill boys">
                    <span className="pill-label">Boys</span>
                    <span className="pill-value">{cls.boys}</span>
                  </div>
                  <div className="stat-pill girls">
                    <span className="pill-label">Girls</span>
                    <span className="pill-value">{cls.girls}</span>
                  </div>
                </div>

                <div className="mini-chart-wrapper">
                  <div className="chart-header">
                    <span className="chart-title">Weekly Progress (%)</span>
                    <ArrowUpRight size={14} color="#1cc88a" />
                  </div>
                  <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={cls.performance}>
                      <Line type="monotone" dataKey="boys" stroke="#4e73df" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="girls" stroke="#f66d9b" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="chart-legend-mini">
                    <span className="legend-dot boys"></span> Boys
                    <span className="legend-dot girls"></span> Girls
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* MODAL: Class Details Dashboard */}
      {selectedClass && (
        <div className="modal-overlay" onClick={() => setSelectedClass(null)}>
          <div className="class-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-group">
                <h2 className="modal-title">{selectedClass.name} Dashboard</h2>
                <div className="modal-badges">
                  <span className="badge-item">Boys: {selectedClass.boys}</span>
                  <span className="badge-item">Girls: {selectedClass.girls}</span>
                </div>
              </div>
              <button className="close-circle" onClick={() => setSelectedClass(null)}><X size={20} /></button>
            </div>

            <div className="modal-body">
              <div className="expanded-chart-card">
                <h4 className="section-subtitle">Comparative Weekly Performance</h4>
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <LineChart data={selectedClass.performance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: '#858796', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#858796', fontSize: 12}} domain={[0, 100]} />
                      <Tooltip contentStyle={{borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                      <Legend verticalAlign="top" align="right" iconType="circle" />
                      <Line name="Boys" type="monotone" dataKey="boys" stroke="#4e73df" strokeWidth={3} dot={{ r: 4, fill: '#4e73df' }} />
                      <Line name="Girls" type="monotone" dataKey="girls" stroke="#f66d9b" strokeWidth={3} dot={{ r: 4, fill: '#f66d9b' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="roster-card">
                <div className="roster-header">
                  <h4 className="section-subtitle">Student Roster</h4>
                  <button className="add-student-inline" onClick={() => setIsAddStudentOpen(true)}>
                    <Plus size={16} /> Add New Student
                  </button>
                </div>
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>GPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedClass.students.map(s => (
                      <tr key={s.id}>
                        <td>{s.name}</td>
                        <td><span className={`gender-tag ${s.gender}`}>{s.gender}</span></td>
                        <td>{s.gpa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Modals */}
      <AddStudentModal 
        isOpen={isAddStudentOpen} 
        onClose={() => setIsAddStudentOpen(false)} 
        targetClass={selectedClass?.name || "Unassigned"}
      />

      <AddClassModal 
        isOpen={isAddClassOpen} 
        onClose={() => setIsAddClassOpen(false)} 
        onAdd={handleAddClass}
      />
    </div>
  );
}