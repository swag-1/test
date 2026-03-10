import React, { useState } from 'react';
import { X, UserPlus, Mail, ShieldCheck, UserCircle } from 'lucide-react';
import './AddUserModal.css';

export default function AddUserModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'STUDENT',
    status: 'Active'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() });
    onClose();
    setFormData({ name: '', email: '', role: 'STUDENT', status: 'Active' });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container animate-slide-up">
        <div className="modal-header">
          <div className="title-group">
            <div className="icon-box"><UserPlus size={20} /></div>
            <h3>Create New User</h3>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="input-field">
            <label><UserCircle size={14} /> Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Jane Smith" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="input-field">
            <label><Mail size={14} /> Institutional Email</label>
            <input 
              type="email" 
              placeholder="j.smith@beacon.edu" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="input-grid">
            <div className="input-field">
              <label><ShieldCheck size={14} /> Assigned Role</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
            <div className="input-field">
              <label>Initial Status</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}