import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"; // Import your CSS for styling

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("auth"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login"; // Redirect to login after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className='seyf'>Seyf<span className='blog'>Blog</span> </Link>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <Link to="/posts/create" className="create-post-button">Create New Post</Link>
        <li><Link to="/about">About Us</Link></li>
        
        {/* Conditionally render Login/Join or Logout based on authentication */}
        {!isAuthenticated ? (
          <li><Link to="/login">Login/Join</Link></li>
        ) : (
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
