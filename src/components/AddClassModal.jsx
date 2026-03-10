import React, { useState } from 'react';
import { X, Layout, User, Palette, CheckCircle2, BookOpen } from 'lucide-react';
import './AddStudentModal.css'; // Reusing base modal styles

export default function AddClassModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    room: '',
    color: '#4e73df'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  const colors = ['#4e73df', '#1cc88a', '#f6c23e', '#e74a3b', '#6f42c1', '#36b9cc'];

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={e => e.stopPropagation()}>
        <div className="form-header">
          <div className="form-title-icon" style={{ backgroundColor: `${formData.color}15`, color: formData.color }}>
            <Layout size={24} />
          </div>
          <div className="form-title-text">
            <h3>Create New Class</h3>
            <p>Set up a new academic group</p>
          </div>
          <button className="form-close" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="student-form">
          <div className="input-group">
            <label>Class Name</label>
            <input 
              type="text" 
              placeholder="e.g. Grade 12-D" 
              required 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Primary Teacher</label>
            <div className="input-with-icon">
              <input 
                type="text" 
                placeholder="Search teacher..." 
                onChange={(e) => setFormData({...formData, teacher: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Classroom / Room No.</label>
            <input 
              type="text" 
              placeholder="e.g. Hall B or Room 202" 
              onChange={(e) => setFormData({...formData, room: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Theme Color</label>
            <div className="color-picker-grid">
              {colors.map(c => (
                <div 
                  key={c} 
                  className={`color-option ${formData.color === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setFormData({...formData, color: c})}
                />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">
              <CheckCircle2 size={18} /> Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}