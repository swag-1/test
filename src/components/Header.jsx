import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, Settings, LogOut, Shield } from 'lucide-react';
import './header.css';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="top-header">
      <div className="header-search">
        <Search size={16} color="#b7b9cc" />
        <input type="text" placeholder="Search for students, staff..." />
      </div>
      
      <div className="header-right">
        <div className="notification-icon">
           <Bell size={20} color="#b7b9cc" onClick={() => navigate('/notifications')} />
           <span className="badge">3</span>
        </div>

        <div className="user-profile-trigger" onClick={() => setShowDropdown(!showDropdown)}>
          <span className="user-name">Admin User</span>
          <div className="avatar-wrapper">
            <User size={20} color="#4e73df" />
          </div>

          {showDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <strong>System Admin</strong>
                <span>admin@beacon.edu</span>
              </div>
              <hr />
              <div className="dropdown-item" onClick={() => navigate('/settings')}>
                <Settings size={14} /> Account Settings
              </div>
              <div className="dropdown-item" onClick={() => navigate('/settings/security')}>
                <Shield size={14} /> Security
              </div>
              <hr />
              <div className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={14} /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}