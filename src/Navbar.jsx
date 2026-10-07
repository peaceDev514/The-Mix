import { useState } from "react";
import "./Navbar.css";

import Logo from "./assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <header className="navbar">

      {/* Logo Image */}
      <a href="#home" onClick={closeMenu}>
        <img
          src={Logo}
          alt="The Mix"
          style={{ width: "100px" }}
        />
      </a>

      {/* Text Logo */}
      <a
        href="#home"
        className="logo"
        onClick={closeMenu}
      >
        The Mix
      </a>

      {/* ================================
          DESKTOP NAVIGATION
      ================================= */}

      <nav className="desktop-nav">
        <a href="#home">Home</a>

        <a href="#about">About</a>

        <a href="#menu">Menu</a>

        <a href="#gallery">Gallery</a>

        <a href="#contact">Contact</a>

        <a
          href="#reservation"
          className="nav-btn"
        >
          Book a Table
        </a>
      </nav>

      {/* ================================
          MOBILE MENU BUTTON
      ================================= */}

      <button
        type="button"
        className={`menu-btn ${open ? "active" : ""}`}
        onClick={toggleMenu}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        <span></span>
      </button>

      {/* ================================
          MOBILE MENU
      ================================= */}

      <nav
        className={`mobile-menu ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <a
          href="#home"
          onClick={closeMenu}
        >
          Home
        </a>

        <a
          href="#about"
          onClick={closeMenu}
        >
          About
        </a>

        <a
          href="#menu"
          onClick={closeMenu}
        >
          Menu
        </a>

        <a
          href="#gallery"
          onClick={closeMenu}
        >
          Gallery
        </a>

        <a
          href="#contact"
          onClick={closeMenu}
        >
          Contact
        </a>

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
