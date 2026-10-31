import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import hamburger from "../../assets/hamburger.png";
import close from "../../assets/close.png";
import About from "../../Pages/About";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <img
          style={{ width: "50px", height: "40px" }}
          src={open ? close : hamburger}
          alt=""
        />
      </button>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li className="mobile-only">
          <Link
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
            to="/Servicepage"
          >
            Our Services
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
            to="/Team"
          >
            Our Team
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
            to="/About"
          >
            About us
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none", color: "black" }}
            to="/contact"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
