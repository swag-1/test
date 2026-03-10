// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import { 
//   User, Shield, School, Save, Users, 
//   Trash2, Power, Search, Lock, Key, 
//   Mail, Bell, Camera
// } from 'lucide-react';
// import './Settings.css';

// export default function Settings() {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   // User List State (for User Access Tab)
//   const [userList, setUserList] = useState([
//     { id: 1, name: "Sarah Connor", email: "s.connor@beacon.edu", role: "TEACHER", status: "Active" },
//     { id: 2, name: "John Doe", email: "j.doe@beacon.edu", role: "STUDENT", status: "Inactive" },
//     { id: 3, name: "Admin Mike", email: "mike@beacon.edu", role: "ADMIN", status: "Active" },
//     { id: 4, name: "Elena Rodriguez", email: "e.rod@beacon.edu", role: "TEACHER", status: "Active" },
//   ]);

//   // Handle Toggle Status
//   const toggleStatus = (id) => {
//     setUserList(userList.map(user => 
//       user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
//     ));
//   };

//   // Filter logic
//   const filteredUsers = userList.filter(u => 
//     u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     u.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className={`dashboard-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
//       <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
//       <div className="main-wrapper">
//         <Header />
        
//         <main className="main-content">
//           <div className="page-header">
//             <div>
//               <h2 className="page-title">System Settings</h2>
//               <p className="page-subtitle">Configure your account and school preferences</p>
//             </div>
//           </div>

//           <div className="settings-card">
//             {/* Navigation Left Panel */}
//             <nav className="settings-nav">
//               <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
//                 <User size={18} /> <span>Profile</span>
//               </button>
//               <button className={activeTab === 'school' ? 'active' : ''} onClick={() => setActiveTab('school')}>
//                 <School size={18} /> <span>School Info</span>
//               </button>
//               <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
//                 <Users size={18} /> <span>User Access</span>
//               </button>
//               <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
//                 <Shield size={18} /> <span>Security</span>
//               </button>
//             </nav>

//             {/* Form Content Right Panel */}
//             <div className="settings-form-area">
              
//               {/* TAB 1: PROFILE */}
// {activeTab === 'profile' && (
//   <div className="form-section animate-fade">
//     <div className="section-header">
//       <h3>Personal Information</h3>
//       <p className="section-desc">Update your photo and personal details here.</p>
//     </div>
    
//     <div className="profile-upload-section">
//       <div className="avatar-container">
//         <div className="avatar-large">
//           <User size={40} />
//           <label htmlFor="avatar-input" className="camera-overlay">
//             <Camera size={18} />
//           </label>
//         </div>
//         <input type="file" id="avatar-input" hidden />
//       </div>
      
//       <div className="profile-action-btns">
//         <button className="btn-upload-primary">Change Photo</button>
//         <button className="btn-remove-secondary">Remove</button>
//       </div>
//     </div>

//     <div className="grid-inputs">
//       <div className="input-box">
//         <label>Full Name</label>
//         <input type="text" className="styled-input" defaultValue="System Administrator" />
//       </div>
//       <div className="input-box">
//         <label>Email Address</label>
//         <input type="email" className="styled-input" defaultValue="admin@beacon.edu" />
//       </div>
//     </div>
//   </div>
// )}

//               {/* TAB 2: SCHOOL INFO */}
//               {activeTab === 'school' && (
//                 <div className="form-section animate-fade">
//                   <h3>Institutional Configuration</h3>
//                   <div className="input-box">
//                     <label>School Name</label>
//                     <input type="text" defaultValue="Beacon Academy International" />
//                   </div>
//                   <div className="grid-inputs">
//                     <div className="input-box">
//                       <label>Academic Session</label>
//                       <select>
//                         <option>2025/2026</option>
//                         <option>2026/2027</option>
//                       </select>
//                     </div>
//                     <div className="input-box">
//                       <label>Current Term</label>
//                       <select>
//                         <option>First Term</option>
//                         <option>Second Term</option>
//                         <option>Third Term</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* TAB 3: USER ACCESS + SEARCH */}
//               {activeTab === 'users' && (
//                 <div className="form-section animate-fade">
//                   <div className="section-header-flex">
//                     <div>
//                       <h3>User Management</h3>
//                       <p className="section-desc">Monitor and control system access</p>
//                     </div>
//                     <div className="settings-search">
//                       <Search size={16} />
//                       <input 
//                         type="text" 
//                         placeholder="Search by name or email..." 
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div className="settings-table-container">
//                     <table className="settings-user-table">
//                       <thead>
//                         <tr>
//                           <th>User Details</th>
//                           <th>Role</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredUsers.map((user) => (
//                           <tr key={user.id}>
//                             <td>
//                               <div className="user-cell">
//                                 <span className="u-name">{user.name}</span>
//                                 <span className="u-email">{user.email}</span>
//                               </div>
//                             </td>
//                             <td>
//                               <span className={`role-pill ${user.role.toLowerCase()}`}>{user.role}</span>
//                             </td>
//                             <td>
//                               <span className={`status-pill ${user.status.toLowerCase()}`}>{user.status}</span>
//                             </td>
//                             <td>
//                               <div className="settings-actions">
//                                 <button className="action-btn toggle" onClick={() => toggleStatus(user.id)}>
//                                   <Power size={14} />
//                                 </button>
//                                 <button className="action-btn delete">
//                                   <Trash2 size={14} />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}

//               {/* TAB 4: SECURITY */}
//               {activeTab === 'security' && (
//                 <div className="form-section animate-fade">
//                   <h3>Security & Authentication</h3>
//                   <div className="security-form">
//                     <div className="input-box">
//                       <label><Lock size={14} /> Current Password</label>
//                       <input type="password" placeholder="••••••••" />
//                     </div>
//                     <hr className="form-divider" />
//                     <div className="input-box">
//                       <label><Key size={14} /> New Password</label>
//                       <input type="password" placeholder="New password" />
//                     </div>
//                     <div className="input-box">
//                       <label>Confirm Password</label>
//                       <input type="password" placeholder="Confirm new password" />
//                     </div>
//                     <div className="security-info-card">
//                       <Shield size={20} />
//                       <p>Passwords should contain at least 8 characters, including a number and a symbol.</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* GLOBAL SAVE BUTTON */}
//               {activeTab !== 'users' && (
//                 <button className="save-settings-btn">
//                   <Save size={18} /> Save Changes
//                 </button>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddUserModal from '../components/AddUserModal';
import { 
  User, Shield, School, Save, Users, 
  Trash2, Power, Search, Lock, Key, 
  Camera, UserPlus
} from 'lucide-react';
import './Settings.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // User List State
  const [userList, setUserList] = useState([
    { id: 1, name: "Sarah Connor", email: "s.connor@beacon.edu", role: "TEACHER", status: "Active" },
    { id: 2, name: "John Doe", email: "j.doe@beacon.edu", role: "STUDENT", status: "Inactive" },
    { id: 3, name: "Admin Mike", email: "mike@beacon.edu", role: "ADMIN", status: "Active" },
  ]);

  // Handle adding a new user from the modal
  const handleAddNewUser = (newUser) => {
    setUserList([...userList, newUser]);
  };

  // Handle Status Toggle
  const toggleStatus = (id) => {
    setUserList(userList.map(user => 
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    ));
  };

  // Filter logic for the search bar
  const filteredUsers = userList.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`dashboard-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <div className="main-wrapper">
        <Header />
        
        <main className="main-content">
          <div className="page-header">
            <div>
              <h2 className="page-title">System Settings</h2>
              <p className="page-subtitle">Manage institutional configurations and user access</p>
            </div>
          </div>

          <div className="settings-card">
            {/* Sidebar Navigation */}
            <nav className="settings-nav">
              <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                <User size={18} /> <span>Profile</span>
              </button>
              <button className={activeTab === 'school' ? 'active' : ''} onClick={() => setActiveTab('school')}>
                <School size={18} /> <span>School Info</span>
              </button>
              <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                <Users size={18} /> <span>User Access</span>
              </button>
              <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
                <Shield size={18} /> <span>Security</span>
              </button>
            </nav>

            {/* Right Side Content Area */}
            <div className="settings-form-area">
              
              {/* --- PROFILE TAB --- */}
              {activeTab === 'profile' && (
                <div className="form-section animate-fade">
                  <h3>Personal Information</h3>
                  <div className="profile-upload-section">
                    <div className="avatar-container">
                      <div className="avatar-large">
                        <User size={40} />
                        <label htmlFor="avatar-input" className="camera-overlay">
                          <Camera size={18} />
                        </label>
                      </div>
                      <input type="file" id="avatar-input" hidden />
                    </div>
                    <div className="profile-action-btns">
                      <button className="btn-upload-primary">Change Photo</button>
                      <button className="btn-remove-secondary">Remove</button>
                    </div>
                  </div>
                  <div className="grid-inputs">
                    <div className="input-box">
                      <label>Full Name</label>
                      <input type="text" className="styled-input" defaultValue="System Administrator" />
                    </div>
                    <div className="input-box">
                      <label>Email Address</label>
                      <input type="email" className="styled-input" defaultValue="admin@beacon.edu" />
                    </div>
                  </div>
                </div>
              )}

              {/* --- SCHOOL INFO TAB --- */}
              {activeTab === 'school' && (
                <div className="form-section animate-fade">
                  <h3>Institutional Configuration</h3>
                  <div className="input-box">
                    <label>School Name</label>
                    <input type="text" className="styled-input" defaultValue="Beacon Academy International" />
                  </div>
                  <div className="grid-inputs">
                    <div className="input-box">
                      <label>Academic Session</label>
                      <select className="styled-input">
                        <option>2025/2026</option>
                        <option>2026/2027</option>
                      </select>
                    </div>
                    <div className="input-box">
                      <label>Current Term</label>
                      <select className="styled-input">
                        <option>First Term</option>
                        <option>Second Term</option>
                        <option>Third Term</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* --- USER ACCESS TAB --- */}
              {activeTab === 'users' && (
                <div className="form-section animate-fade">
                  <div className="section-header-flex">
                    <div>
                      <h3>User Management</h3>
                      <p className="section-desc">Manage system access for staff and students</p>
                    </div>
                    <div className="header-actions">
                      <div className="settings-search">
                        <Search size={16} />
                        <input 
                          type="text" 
                          placeholder="Search users..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <button className="btn-upload-primary" onClick={() => setIsModalOpen(true)}>
                        <UserPlus size={16} /> Add User
                      </button>
                    </div>
                  </div>

                  <div className="settings-table-container">
                    <table className="settings-user-table">
                      <thead>
                        <tr>
                          <th>User Details</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <div className="user-cell">
                                <span className="u-name">{user.name}</span>
                                <span className="u-email">{user.email}</span>
                              </div>
                            </td>
                            <td>
                              <span className={`role-pill ${user.role.toLowerCase()}`}>{user.role}</span>
                            </td>
                            <td>
                              <span className={`status-pill ${user.status.toLowerCase()}`}>{user.status}</span>
                            </td>
                            <td>
                              <div className="settings-actions">
                                <button className="action-btn toggle" onClick={() => toggleStatus(user.id)}>
                                  <Power size={14} />
                                </button>
                                <button className="action-btn delete">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- SECURITY TAB --- */}
              {activeTab === 'security' && (
                <div className="form-section animate-fade">
                  <h3>Security & Authentication</h3>
                  <div className="security-form">
                    <div className="input-box">
                      <label><Lock size={14} /> Current Password</label>
                      <input type="password" placeholder="••••••••" className="styled-input" />
                    </div>
                    <hr className="form-divider" />
                    <div className="input-box">
                      <label><Key size={14} /> New Password</label>
                      <input type="password" placeholder="New password" className="styled-input" />
                    </div>
                    <div className="input-box">
                      <label>Confirm Password</label>
                      <input type="password" placeholder="Confirm new password" className="styled-input" />
                    </div>
                    <div className="security-info-card">
                      <Shield size={20} />
                      <p>Passwords must be at least 8 characters long and include a mix of letters, numbers, and symbols.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SAVE BUTTON (Hidden on User Management tab) */}
              {activeTab !== 'users' && (
                <button className="save-settings-btn">
                  <Save size={18} /> Save All Changes
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ADD USER MODAL */}
      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddNewUser} 
      />
    </div>
  );
}