// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { 
//   LayoutDashboard, Users, BookOpen, GraduationCap, 
//   Wallet, MessageSquare, Bell, Settings, ChevronDown, 
//   ClipboardList, BookCheck, UserCog, LogOut, Award,
//   CheckCircle // Added this missing import
// } from 'lucide-react';
// import './Sidebar.css';

// export default function Sidebar() {
//   const [openMenus, setOpenMenus] = useState({
//     academics: true,
//     management: false,
//   });

//   const toggleMenu = (menu) => {
//     setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
//   };

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <div className="logo-box">
//           <Award size={24} />
//         </div>
//         <div className="brand-text">
//           <h3>Beacon</h3>
//           <span>Admin Portal</span>
//         </div>
//       </div>

//       <nav className="sidebar-nav">
//         {/* MAIN */}
//         <div className="nav-group">
//           <span className="group-label">Main</span>
//           <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
//             <LayoutDashboard size={20} /> <span>Admin Overview</span>
//           </NavLink>
//           <NavLink to="/t-dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
//             <UserCog size={20} /> <span>Teacher Panel</span>
//           </NavLink>
//         </div>

//         {/* ACADEMICS DROPDOWN */}
//         <div className={`nav-group ${openMenus.academics ? 'is-open' : ''}`}>
//           <div className="group-header" onClick={() => toggleMenu('academics')}>
//             <span className="group-label">Academics</span>
//             <ChevronDown size={14} className="chevron" />
//           </div>
//           <div className="sub-menu">
//             <NavLink to="/academic" className="nav-item">
//               <BookOpen size={18} /> <span>Academic Manager</span>
//             </NavLink>
//             <NavLink to="/lessons" className="nav-item">
//               <BookCheck size={18} /> <span>Lesson Plans</span>
//             </NavLink>
//             <NavLink to="/subject" className="nav-item">
//               <ClipboardList size={18} /> <span>Subject Mapping</span>
//             </NavLink>
//             <NavLink to="/report" className="nav-item">
//               <GraduationCap size={18} /> <span>Student Reports</span>
//             </NavLink>
//           </div>
//         </div>

//         {/* MANAGEMENT DROPDOWN */}
//         <div className={`nav-group ${openMenus.management ? 'is-open' : ''}`}>
//           <div className="group-header" onClick={() => toggleMenu('management')}>
//             <span className="group-label">Management</span>
//             <ChevronDown size={14} className="chevron" />
//           </div>
//           <div className="sub-menu">
//             <NavLink to="/student" className="nav-item">
//               <Users size={18} /> <span>Students</span>
//             </NavLink>
//             <NavLink to="/Staff" className="nav-item">
//               <UserCog size={18} /> <span>Staff</span>
//             </NavLink>
//             <NavLink to="/classes" className="nav-item">
//               <LayoutDashboard size={18} /> <span>Classes</span>
//             </NavLink>
//             <NavLink to="/attendance" className="nav-item">
//               <CheckCircle size={18} /> <span>Attendance Admin</span>
//             </NavLink>
//             <NavLink to="/finance" className="nav-item">
//               <Wallet size={18} /> <span>Finance</span>
//             </NavLink>
//           </div>
//         </div>

//         {/* UTILITIES */}
//         <div className="nav-group">
//           <span className="group-label">Communication</span>
//           <NavLink to="/message" className="nav-item"><MessageSquare size={20} /> <span>Messages</span></NavLink>
//           <NavLink to="/notifications" className="nav-item"><Bell size={20} /> <span>Notifications</span></NavLink>
//           <NavLink to="/settings" className="nav-item"><Settings size={20} /> <span>Settings</span></NavLink>
//         </div>
//       </nav>

//       <div className="sidebar-footer">
//         <button className="logout-btn">
//           <LogOut size={18} /> <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }





import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, 
  Wallet, MessageSquare, Bell, Settings, ChevronDown, 
  ClipboardList, BookCheck, UserCog, LogOut, Award,
  CheckCircle, Menu, X // Added Menu and X
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile toggle state
  const [openMenus, setOpenMenus] = useState({ academics: true, management: false });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      {/* 1. Hamburger Button (Visible only on Mobile) */}
      <button className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 2. Backdrop Overlay (Visible only when sidebar is open on mobile) */}
      {isMobileOpen && <div className="sidebar-overlay" onClick={closeMobileMenu}></div>}

      {/* 3. The Sidebar */}
      <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-box"><Award size={24} /></div>
          <div className="brand-text">
            <h3>Beacon</h3>
            <span>Admin Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <span className="group-label">Main</span>
            <NavLink to="/dashboard" onClick={closeMobileMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <LayoutDashboard size={20} /> <span>Admin Overview</span>
            </NavLink>
            <NavLink to="/t-dashboard" onClick={closeMobileMenu} className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
              <UserCog size={20} /> <span>Teacher Panel</span>
            </NavLink>
          </div>

          {/* ACADEMICS DROPDOWN */}
          <div className={`nav-group ${openMenus.academics ? 'is-open' : ''}`}>
            <div className="group-header" onClick={() => toggleMenu('academics')}>
              <span className="group-label">Academics</span>
              <ChevronDown size={14} className="chevron" />
            </div>
            <div className="sub-menu">
              <NavLink to="/academic" onClick={closeMobileMenu} className="nav-item"><BookOpen size={18} /> <span>Academic Manager</span></NavLink>
              <NavLink to="/lessons" onClick={closeMobileMenu} className="nav-item"><BookCheck size={18} /> <span>Lesson Plans</span></NavLink>
              <NavLink to="/subject" onClick={closeMobileMenu} className="nav-item"><ClipboardList size={18} /> <span>Subject Mapping</span></NavLink>
              <NavLink to="/report" onClick={closeMobileMenu} className="nav-item"><GraduationCap size={18} /> <span>Student Reports</span></NavLink>
            </div>
          </div>

          {/* MANAGEMENT DROPDOWN */}
          <div className={`nav-group ${openMenus.management ? 'is-open' : ''}`}>
            <div className="group-header" onClick={() => toggleMenu('management')}>
              <span className="group-label">Management</span>
              <ChevronDown size={14} className="chevron" />
            </div>
            <div className="sub-menu">
              <NavLink to="/student" onClick={closeMobileMenu} className="nav-item"><Users size={18} /> <span>Students</span></NavLink>
              <NavLink to="/Staff" onClick={closeMobileMenu} className="nav-item"><UserCog size={18} /> <span>Staff</span></NavLink>
              <NavLink to="/classes" onClick={closeMobileMenu} className="nav-item"><LayoutDashboard size={18} /> <span>Classes</span></NavLink>
              <NavLink to="/attendance" onClick={closeMobileMenu} className="nav-item"><CheckCircle size={18} /> <span>Attendance Admin</span></NavLink>
              <NavLink to="/finance" onClick={closeMobileMenu} className="nav-item"><Wallet size={18} /> <span>Finance</span></NavLink>
            </div>
          </div>

          <div className="nav-group">
            <span className="group-label">Communication</span>
            <NavLink to="/message" onClick={closeMobileMenu} className="nav-item"><MessageSquare size={20} /> <span>Messages</span></NavLink>
            <NavLink to="/notifications" onClick={closeMobileMenu} className="nav-item"><Bell size={20} /> <span>Notifications</span></NavLink>
            <NavLink to="/settings" onClick={closeMobileMenu} className="nav-item"><Settings size={20} /> <span>Settings</span></NavLink>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}