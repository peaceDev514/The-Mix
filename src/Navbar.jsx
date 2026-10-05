import { useState } from "react";
import "./Navbar.css";

import Logo from './assets/logo.png';

function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <a href="#home"><img src={Logo} style={{ width: "100px" }}/></a>
      <a href="#home" className="logo" onClick={closeMenu}>
        The Mix
      </a>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#menu">Menu</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact">Contact</a>
        <a href="#reservation" className="nav-btn">
          Book a Table
        </a>
      </nav>

      {/* Hamburger */}
      <button
        className={`menu-btn ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu */}
      <nav className={`mobile-menu ${open ? "show" : ""}`}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#menu" onClick={closeMenu}>Menu</a>
        <a href="#gallery" onClick={closeMenu}>Gallery</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>

        <a
          href="#reservation"
          className="mobile-reserve"
          onClick={closeMenu}
        >
          Book a Table
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
