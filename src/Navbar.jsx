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

  const toggleCart = () => {
    window.dispatchEvent(
      new Event("toggleCart")
    );

    setOpen(false);
  };

  return (
    <header className="navbar">

      {/* LOGO IMAGE */}

      <a
        href="#home"
        onClick={closeMenu}
      >
        <img
          src={Logo}
          alt="The Mix"
          className="navbar-logo-image"
        />
      </a>


      {/* TEXT LOGO */}

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

        <a href="#home">
          Home
        </a>

        <a href="#about">
          About
        </a>

        <a href="#menu">
          Menu
        </a>

        <a href="#gallery">
          Gallery
        </a>

        <a href="#contact">
          Contact
        </a>

        <a
          href="#reservation"
          className="nav-btn"
        >
          Book a Table
        </a>


        {/* CART BUTTON */}

        <button
          type="button"
          className="nav-cart-btn"
          onClick={toggleCart}
          aria-label="Toggle shopping cart"
        >
          <span className="nav-cart-icon">
            🛒
          </span>

          <span>
            Cart
          </span>
        </button>

      </nav>


      {/* ================================
          MOBILE ACTIONS
      ================================= */}

      <div className="mobile-actions">

        {/* CART */}

        <button
          type="button"
          className="mobile-cart-btn"
          onClick={toggleCart}
          aria-label="Toggle shopping cart"
        >
          <span className="nav-cart-icon">
            🛒
          </span>
        </button>


        {/* HAMBURGER */}

        <button
          type="button"
          className={`menu-btn ${
            open ? "active" : ""
          }`}
          onClick={toggleMenu}
          aria-label={
            open
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={open}
        >
          <span></span>
        </button>

      </div>


      {/* ================================
          MOBILE MENU
      ================================= */}

      <nav
        className={`mobile-menu ${
          open ? "open" : ""
        }`}
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
