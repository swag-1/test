import React, { useState } from 'react';
import { 
  Search, Plus, Filter, MoreHorizontal, 
  ChevronDown, Download, Check, Mail, 
  Briefcase, ShieldCheck 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Students.css'; // Reusing shared table/card styles
import './Staff.css';    // Staff-specific refinements

const staffData = [
  { id: "EMP101", name: "Dr. Kwesi Appiah", role: "Sr. Teacher", dept: "Mathematics", status: "Active", email: "k.appiah@school.gh", joinDate: "12 Aug 2020" },
  { id: "EMP102", name: "Mrs. Faustina Mensah", role: "Administrator", dept: "Operations", status: "Active", email: "f.mensah@school.gh", joinDate: "05 Jan 2019" },
  { id: "EMP103", name: "Prof. Kofi Antwi", role: "HOD", dept: "Science", status: "Active", email: "k.antwi@school.gh", joinDate: "22 Sep 2015" },
  { id: "EMP104", name: "Osei Tutu", role: "Security", dept: "Safety", status: "Inactive", email: "o.tutu@school.gh", joinDate: "15 Mar 2022" },
  { id: "EMP105", name: "Akua Afriyie", role: "Sr. Teacher", dept: "English", status: "Active", email: "a.afriyie@school.gh", joinDate: "10 Feb 2021" },
  { id: "EMP106", name: "Ekow Dankwa", role: "Accounts", dept: "Finance", status: "Active", email: "e.dankwa@school.gh", joinDate: "20 Nov 2018" },
  { id: "EMP107", name: "Naa Lamiley", role: "Librarian", dept: "Library", status: "Active", email: "n.lamiley@school.gh", joinDate: "14 June 2017" },
  { id: "EMP108", name: "Yaw Gyamfi", role: "IT Support", dept: "Technology", status: "Active", email: "y.gyamfi@school.gh", joinDate: "03 May 2023" },
];

export default function Staff() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [searchTerm, setSearchTerm] = useState("");

  const depts = ["All Departments", "Mathematics", "Science", "Operations", "Safety", "Arts"];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          
          <div className="page-title-row">
            <div>
              <h2 className="page-heading">Staff Directory</h2>
              <p className="page-subheading">View and manage faculty and administrative members</p>
            </div>
            <div className="action-btns">
              <button className="btn-secondary"><Download size={16} /> Report</button>
              <button className="btn-primary"><Plus size={16} /> Onboard Staff</button>
            </div>
          </div>

          <div className="table-controls viz-card">
            <div className="search-box">
              <Search size={18} color="#b7b9cc" />
              <input 
                type="text" 
                placeholder="Search staff by name, ID or role..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-container">
  <button 
    className={`premium-filter-btn ${isFilterOpen ? 'is-active' : ''} ${selectedDept !== "All Departments" ? 'has-value' : ''}`}
    onClick={() => setIsFilterOpen(!isFilterOpen)}
  >
    <div className="filter-btn-content">
      <Filter size={14} className="filter-icon" />
      <span className="filter-text">{selectedDept}</span>
    </div>
    <ChevronDown size={14} className={`chevron ${isFilterOpen ? 'open' : ''}`} />
    
    {/* Optional badge if filter is active */}
    {selectedDept !== "All Departments" && <span className="filter-dot" />}
  </button>

  {isFilterOpen && (
    <div className="premium-dropdown">
      <div className="dropdown-header">Select Department</div>
      {depts.map((dept) => (
        <div 
          key={dept} 
          className={`premium-item ${selectedDept === dept ? 'selected' : ''}`}
          onClick={() => {
            setSelectedDept(dept);
            setIsFilterOpen(false);
          }}
        >
          <span>{dept}</span>
          {selectedDept === dept && <Check size={14} className="check-icon" />}
        </div>
      ))}
    </div>
  )}
</div>
          </div>

          <div className="viz-card table-card">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>ID & Role</th>
                  <th>Department</th>
                  <th>Joining Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staffData.map((staff) => (
                  <tr key={staff.id}>
                    <td>
                      <div className="student-profile-cell">
                        <div className="avatar-staff">{staff.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <p className="student-table-name">{staff.name}</p>
                          <p className="student-table-email"><Mail size={10} /> {staff.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="role-column">
                        <span className="id-badge">{staff.id}</span>
                        <p className="role-text">{staff.role}</p>
                      </div>
                    </td>
                    <td>
                      <div className="dept-tag">
                        <Briefcase size={12} /> {staff.dept}
                      </div>
                    </td>
                    <td>{staff.joinDate}</td>
                    <td>
                      <span className={`status-pill ${staff.status.toLowerCase()}`}>
                        {staff.status === "Active" ? <ShieldCheck size={10} /> : null} {staff.status}
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