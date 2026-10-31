import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; 
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <Link to="/" className="footer__logo">
          <img src={logo} alt="NCV Law" />
        </Link>

        <div className="footer__news">
          <h3 className="footer__heading">Join our Newsletter</h3>
          <p className="footer__text">
            From legal updates to firm news, staying connected to stay
            informed.
          </p>

          
          <Link to="/contact" className="footer__btn footer__btn--outline">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="footer__bar">
        <Link to="/privacy">Privacy Policy</Link> |{" "}
        <Link to="/disclaimer">Disclaimer</Link> |{" "}
        <Link to="/accessibility">Accessibility</Link> | Copyright © 2026 NCV
        Law. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;