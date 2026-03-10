import React, { useState } from 'react';
import { X, User, Book, GraduationCap, CheckCircle2 } from 'lucide-react';
import './AddStudentModal.css';

export default function AddStudentModal({ isOpen, onClose, targetClass }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Boy',
    age: '',
    email: '',
    studentId: `STU-${Math.floor(1000 + Math.random() * 9000)}`
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Student Data:", formData, "Assigned to:", targetClass);
    // Logic to update state/database goes here
    onClose();
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={e => e.stopPropagation()}>
        <div className="form-header">
          <div className="form-title-icon">
            <User className="icon-blue" />
          </div>
          <div className="form-title-text">
            <h3>Enroll New Student</h3>
            <p>Assigning to <span className="highlight-text">{targetClass}</span></p>
          </div>
          <button className="form-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="student-form">
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Alexander Pierce" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Student ID</label>
              <input type="text" value={formData.studentId} disabled className="disabled-input" />
            </div>
            <div className="input-group">
              <label>Age</label>
              <input 
                type="number" 
                placeholder="15" 
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Gender</label>
            <div className="gender-selection">
              <div 
                className={`gender-tile ${formData.gender === 'Boy' ? 'selected boy' : ''}`}
                onClick={() => setFormData({...formData, gender: 'Boy'})}
              >
                <div className="radio-circle"></div>
                <span>Boy</span>
              </div>
              <div 
                className={`gender-tile ${formData.gender === 'Girl' ? 'selected girl' : ''}`}
                onClick={() => setFormData({...formData, gender: 'Girl'})}
              >
                <div className="radio-circle"></div>
                <span>Girl</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Parent/Guardian Email</label>
            <input 
              type="email" 
              placeholder="parent@example.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">
              <CheckCircle2 size={18} /> Confirm Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}