

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import Dashboard from './pages/Dashboard';
import Academic from './pages/AcademicManager';
import Attendance from './pages/AttendanceAdmin';
import Classes from './pages/Classes';
import Finance from './pages/Finance';
import Lessons from './pages/Lessons';
import Messages from './pages/MessageCenter';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Staff from './pages/StaffPage';
import Students from './pages/StudentPage';
import Report from './pages/StudentReport';
import Subject from './pages/SubjectMapping';



function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Dashboard />} />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Teacher Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/t-dashboard" element={<TeacherDashboard />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/message" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Staff" element={<Staff />} />
          <Route path="/student" element={<Students />} />
          <Route path="/report" element={<Report />} />
          <Route path="/subject" element={<Subject />} />

          {/* Catch-all: Redirect unknown URLs to Landing Page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;