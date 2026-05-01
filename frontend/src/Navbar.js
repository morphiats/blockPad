import React from 'react';
import './Navbar.css';

function BlockPadLogo() {
  return (
    <svg width="140" height="44" viewBox="0 0 140 44" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="22" cy="22" rx="22" ry="22" fill="url(#glow)"/>
      <rect x="4" y="4" width="36" height="36" rx="7" fill="#111" stroke="#a855f7" strokeWidth="1.5"/>
      <text x="22" y="14" textAnchor="middle" fill="#a855f7" fontSize="6" fontFamily="monospace" letterSpacing="1">ADA</text>
      <text x="22" y="28" textAnchor="middle" fill="#a3e635" fontSize="16" fontWeight="bold" fontFamily="Arial">BP</text>
      <text x="22" y="37" textAnchor="middle" fill="white" fontSize="5" fontFamily="monospace" letterSpacing="1">BLOCK PAD</text>
      <text x="58" y="20" fill="#a855f7" fontSize="16" fontWeight="bold" fontFamily="Arial" letterSpacing="1">BLOCK</text>
      <text x="58" y="38" fill="#a3e635" fontSize="16" fontWeight="bold" fontFamily="Arial" letterSpacing="1">PAD</text>
    </svg>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <BlockPadLogo />
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/listings">Listings</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
