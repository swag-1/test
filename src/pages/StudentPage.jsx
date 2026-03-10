import React, { useState } from 'react';
import { 
  Search, Plus, Filter, MoreHorizontal, 
  Mail, Phone, GraduationCap, Download 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Students.css';

const studentData = [
  { id: "STU001", name: "Kwame Mensah", sex: "male", class: "Basic 1", section: "A", status: "Active", parent: "Kofi Mensah", email: "k.mensah@school.gh", contact: "0245623780" },
  { id: "STU002", name: "Abena Osei", sex: "female", class: "Basic 3", section: "B", status: "Active", parent: "Akosua Osei", email: "a.osei@school.gh", contact: "0245623780" },
  { id: "STU003", name: "Kofi Boateng", sex: "male", class: "Basic 5", section: "C", status: "Inactive", parent: "Kwesi Boateng", email: "k.boateng@school.gh", contact: "0245623780" },
  { id: "STU004", name: "Efua Adjei", sex: "female", class: "Basic 9", section: "A", status: "Active", parent: "Yaw Adjei", email: "e.adjei@school.gh", contact: "0245623780" },
  { id: "STU005", name: "Ekow Baidoo", sex: "male", class: "Basic 3", section: "B", status: "Active", parent: "Araba Baidoo", email: "e.baidoo@school.gh", contact: "0245623780" },
  { id: "STU006", name: "Yaw Asante", sex: "male", class: "Basic 5", section: "A", status: "Active", parent: "Nana Asante", email: "y.asante@school.gh", contact: "0245623780" },
  { id: "STU007", name: "Akosua Addo", sex: "female", class: "Basic 3", section: "B", status: "Active", parent: "Maame Addo", email: "a.addo@school.gh", contact: "0245623780" },
  { id: "STU008", name: "Nii Armah", sex: "male", class: "Basic 2", section: "C", status: "Inactive", parent: "Naa Ayeley", email: "n.armah@school.gh", contact: "0245623780" },
  { id: "STU009", name: "Esi Forson", sex: "female", class: "Basic 4", section: "A", status: "Active", parent: "Kojo Forson", email: "e.forson@school.gh", contact: "0245623780" },
  { id: "STU010", name: "Abdul-Rahman Issah", sex: "male", class: "Basic 3", section: "B", status: "Active", parent: "Fatima Issah", email: "a.issah@school.gh", contact: "0245623780" },  
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          
          {/* PAGE HEADER */}
          <div className="page-title-row">
            <div>
              <h2 className="page-heading">Student Directory</h2>
              <p className="page-subheading">Manage and view all enrolled students</p>
            </div>
            <div className="action-btns">
              <button className="btn-secondary"><Download size={16} /> Export</button>
              <button className="btn-primary"><Plus size={16} /> Add Student</button>
            </div>
          </div>

          {/* FILTER & SEARCH BAR */}
         {/* FILTER & SEARCH BAR */}
<div className="table-controls viz-card">
  <div className="search-box">
    <Search size={18} color="#b7b9cc" />
    <input 
      type="text" 
      placeholder="Search by name or ID..." 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
  <div className="filter-group">
    <button className="filter-btn">
      <Filter size={16} /> 
      <span>Filter</span>
    </button>
    
    <div className="filter-select-wrapper">
      <select className="grade-select">
        <option>All Classes</option>
        <option>9th Grade</option>
        <option>10th Grade</option>
        <option>11th Grade</option>
        <option>12th Grade</option>
      </select>
    </div>
  </div>
</div>
          {/* STUDENT TABLE */}
          <div className="viz-card table-card">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Sex</th>
                  <th>Class</th>
                  <th>Parent/Guardian</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-profile-cell">
                        <div className="avatar-small">{student.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <p className="student-table-name">{student.name}</p>
                          <p className="student-table-email">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="id-badge">{student.id}</span></td>
                    <td>{student.sex}</td>
                    <td>{student.class} - {student.section}</td>
                    
                    <td>
                      {student.parent}
                      <p className = "student-table-email1">{student.contact}</p>
                      </td>
                    
                    <td>
                      <span className={`status-pill ${student.status.toLowerCase()}`}>
                        {student.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-icon-btn"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}