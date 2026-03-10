import React, { useState } from 'react';
import { Search, UserPlus, Filter, MoreHorizontal, Mail, Shield, Trash2, Edit } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Users.css';

const UserRow = ({ user }) => (
  <tr className="user-table-row">
    <td>
      <div className="user-profile-cell">
        <div className="user-avatar-circle">{user.name.charAt(0)}</div>
        <div className="user-name-info">
          <p className="u-name">{user.name}</p>
          <p className="u-email">{user.email}</p>
        </div>
      </div>
    </td>
    <td>
      <span className={`role-badge ${user.role.toLowerCase()}`}>
        {user.role}
      </span>
    </td>
    <td>{user.joinedDate}</td>
    <td>
      <div className="status-indicator">
        <span className="status-dot active"></span>
        Active
      </div>
    </td>
    <td className="action-cell">
      <button className="icon-btn"><Edit size={16} /></button>
      <button className="icon-btn delete"><Trash2 size={16} /></button>
    </td>
  </tr>
);

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for now
  const users = [
    { id: 1, name: "Sarah Connor", email: "s.connor@beacon.edu", role: "TEACHER", joinedDate: "12 Oct 2025" },
    { id: 2, name: "John Doe", email: "j.doe@beacon.edu", role: "STUDENT", joinedDate: "15 Oct 2025" },
    { id: 3, name: "Admin Mike", email: "mike@beacon.edu", role: "ADMIN", joinedDate: "01 Sep 2025" },
  ];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <div className="page-header">
            <div>
              <h2 className="page-title">User Management</h2>
              <p className="page-subtitle">Manage all school personnel and student accounts</p>
            </div>
            <button className="add-user-btn">
              <UserPlus size={18} />
              Add New User
            </button>
          </div>

          <div className="filter-bar">
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by name, email or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-actions">
              <button className="filter-btn"><Filter size={16} /> Filter</button>
            </div>
          </div>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User Details</th>
                  <th>Role</th>
                  <th>Joined Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => <UserRow key={u.id} user={u} />)}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}