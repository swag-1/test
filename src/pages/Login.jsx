import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Award } from 'lucide-react';
import './Login.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student'); // student, teacher, or parent

  return (
    <div className="login-container">
      {/* LEFT SIDE: DECORATIVE */}
      <div className="login-visual">
        <div className="visual-content">
          <div className="login-logo">
            <Award size={40} />
            <span>Beacon Academy</span>
          </div>
          <h1>Welcome Back to Excellence.</h1>
          <p>Access your academic dashboard, track progress, and stay connected with our community.</p>
        </div>
        <div className="visual-footer">
          <p>© 2026 Beacon Academy International Portal</p>
        </div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="login-form-area">
        <div className="form-box">
          <div className="form-header">
            <h2>Sign In</h2>
            <p>Please enter your credentials to continue</p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="role-tabs">
            <button 
              className={role === 'student' ? 'active' : ''} 
              onClick={() => setRole('student')}
            >Student</button>
            <button 
              className={role === 'teacher' ? 'active' : ''} 
              onClick={() => setRole('teacher')}
            >Staff</button>
            <button 
              className={role === 'parent' ? 'active' : ''} 
              onClick={() => setRole('parent')}
            >Parent</button>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <label>Institutional Email</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input type="email" placeholder="name@beaconacademy.edu" required />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button" 
                  className="eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-footer">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Keep me logged in</span>
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login to Portal <ArrowRight size={18} />
            </button>
          </form>

          <div className="support-notice">
            <p>Issues logging in? Contact the <a href="#">IT Helpdesk</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}