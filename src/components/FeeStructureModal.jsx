import React from 'react';
import { X, CheckCircle, Calculator } from 'lucide-react';

export default function FeeStructureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const feeTypes = [
    'Tuition', 'Facility', 'Technology', 'Transport', 
    'Library', 'Laboratory', 'Sports', 'Examination', 'Uniform'
  ];

  return (
    <div className="modal-blur-overlay" onClick={onClose}>
      <div className="fee-structure-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-accent" />
        
        <div className="modal-inner">
          {/* FIXED HEADER */}
          <header className="modal-header-v2">
            <div className="header-icon-box">
              <Calculator size={24} color="#6366f1" />
            </div>
            <div className="header-text">
              <h3>Fee Configuration</h3>
              <p>Define academic charges for the 2026 session</p>
            </div>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </header>

          {/* SCROLLABLE BODY SECTION */}
          <div className="fee-editor-scroll-area">
            <div className="fee-editor-grid">
              {feeTypes.map((type) => (
                <div className="fee-input-card" key={type}>
                  <div className="fee-label-row">
                    <label className="fee-label">{type} Fee</label>
                    <span className="fee-category-tag">Per Term</span>
                  </div>
                  
                  <div className="term-input-group">
                    <div className="input-field">
                      <span className="term-indicator">T1</span>
                      <input type="number" placeholder="0" />
                    </div>
                    <div className="input-field">
                      <span className="term-indicator">T2</span>
                      <input type="number" placeholder="0" />
                    </div>
                    <div className="input-field">
                      <span className="term-indicator">T3</span>
                      <input type="number" placeholder="0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FIXED FOOTER */}
          <footer className="modal-footer-v2">
            <div className="summary-pill">
              <span className="pill-label">Annual Total:</span>
              <strong className="pill-value">$4,500.00</strong>
            </div>
            
            <div className="btn-group">
              <button className="btn-discard" onClick={onClose}>
                Discard
              </button>
              <button className="btn-apply" onClick={onClose}>
                <span>Apply Structure</span>
                <CheckCircle size={18} />
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}