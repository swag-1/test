import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Calendar, BookOpen, Award, 
  Globe, Phone, MapPin, LogIn, ChevronRight, 
  ShieldCheck, Users, Sparkles, Instagram, Facebook, Linkedin
} from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="lp-wrapper">
      {/* 1. TOP ANNOUNCEMENT */}
      <div className="vibrant-promo">
        <div className="promo-content">
          <Sparkles size={16} className="sparkle-icon" />
          <span>Admissions for 2026/2027 are now open!</span>
          <button onClick={() => navigate('/login')} className="apply-pill">
            Apply Now <ChevronRight size={14}/>
          </button>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <nav className="lp-nav">
        <div className="nav-container">
          <div className="brand" onClick={() => navigate('/')}>
            <div className="logo-shield"><Award size={28} /></div>
            <div className="brand-name">
              <h1>BEACON</h1>
              <span>ACADEMY</span>
            </div>
          </div>
          
          <ul className="nav-links">
            <li><a href="#academics">Academics</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="nav-cta">
            <button className="portal-btn" onClick={() => navigate('/login')}>
              <LogIn size={18} /> PORTAL LOGIN
            </button>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <header className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-badge">A Heritage of Excellence</div>
            <h1>Empowering the <span className="text-gradient">Visionaries</span> of Tomorrow.</h1>
            <p>At Beacon Academy, we provide a world-class environment where innovation meets tradition to nurture future leaders.</p>
            <div className="hero-btns">
              <button className="btn-vibrant-primary">Enroll Your Child</button>
              <button className="btn-vibrant-secondary">Virtual Tour</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="image-stack">
              <div className="main-image"></div>
              <div className="floating-stat-card">
                <Users size={20} />
                <div>
                  <strong>2,500+</strong>
                  <span>Graduates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 4. COLORFUL FEATURES */}
      <section className="features-section" id="academics">
        <div className="section-header">
          <h2>Why Choose Beacon?</h2>
          <p>We provide a holistic approach to student development.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card color-1">
            <div className="f-icon"><BookOpen /></div>
            <h3>Advanced Curriculum</h3>
            <p>Our syllabus is designed to meet international standards while fostering local cultural values.</p>
          </div>
          <div className="feature-card color-2">
            <div className="f-icon"><ShieldCheck /></div>
            <h3>Secure Environment</h3>
            <p>Safety is our priority. Our campus is equipped with 24/7 security and digital monitoring.</p>
          </div>
          <div className="feature-card color-3">
            <div className="f-icon"><Award /></div>
            <h3>Elite Faculty</h3>
            <p>Learn from the best educators who are committed to mentorship and academic brilliance.</p>
          </div>
        </div>
      </section>

      {/* 5. QUOTE SECTION */}
      <section className="vibrant-quote" id="about">
        <div className="quote-box">
          <div className="quote-icon">“</div>
          <h2>Every student at Beacon Academy is treated as a unique project of potential. We don't just teach; we inspire.</h2>
          <div className="quote-author">
            <strong>Dr. Elizabeth Sterling</strong>
            <span>Head of School</span>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="vibrant-footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <Award size={32} />
              <h3>BEACON <span>ACADEMY</span></h3>
            </div>
            <p>Building a legacy of academic and moral excellence since 1995.</p>
            <div className="social-links">
              <Facebook size={20} /> <Instagram size={20} /> <Linkedin size={20} />
            </div>
          </div>
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Academics</h4>
              <a href="#">Primary School</a>
              <a href="#">High School</a>
              <a href="#">Special Needs</a>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="/login">Portal Access</a>
              <a href="#">School News</a>
              <a href="#">Admissions</a>
            </div>
          </div>
        </div>
        <div className="footer-legal">
          &copy; 2026 Beacon Academy International. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}