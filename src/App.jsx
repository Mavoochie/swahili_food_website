import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
  Link, NavLink, useNavigate
} from 'react-router-dom';
import DishList  from './components/DishList';
import Login     from './components/Login';
import Register  from './components/Register';
import './App.css';

function Navbar() {
  const navigate = useNavigate();
  const token    = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const role     = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        SwahiliEats
        <small>Mombasa · Est. 2025</small>
      </Link>
      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dishes">Menu</NavLink>
        {token ? (
          <>
            <span className="navbar-user">
              {role === 'admin' ? '👑' : '🧑‍🍳'} {username}
            </span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register" className="nav-register">Join Us</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

function Home() {
  const [heroBg, setHeroBg] = useState(null);
  const role = localStorage.getItem('role');

  const handleHeroImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setHeroBg(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="hero">
        {heroBg
          ? <img src={heroBg} alt="Hero background" className="hero-bg-img" />
          : <div className="hero-placeholder" />
        }
        <div className="hero-bg" />
        <div className="hero-content">
          <p className="hero-tagline">🌊 Pwani ni Uhai — The Coast is Life</p>
          <h1>The Soul of <span>Swahili</span> Cooking</h1>
          <p className="hero-sub">
            Slow-cooked biryanis, coconut curries, and grilled mishkaki —
            centuries of coastal tradition on every plate.
          </p>
          <div className="hero-actions">
            <Link to="/dishes" className="hero-cta">Explore Our Menu</Link>
            {role === 'admin' && (
              <label className="hero-upload-label">
                🖼 {heroBg ? 'Change Photo' : 'Upload Cover Photo'}
                <input type="file" accept="image/*" onChange={handleHeroImage} />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Cultural intro strip */}
      <div className="section-intro">
        <p className="eyebrow">Our Heritage</p>
        <h2>Where the Spice Routes Meet the Sea</h2>
        <p>
          Swahili cuisine is the product of centuries of trade between Africa,
          Arabia, India, and Persia — a living culinary heritage from the shores
          of Mombasa and Zanzibar.
        </p>
        <div className="section-divider"></div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      © 2025 <span>SwahiliEats</span> · Mombasa, Kenya · Preserving Coastal Heritage
    </footer>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/dishes"   element={<DishList />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;