import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Social & Resume Buttons */}
      <div className="nav-icons">
        <a 
          href="https://www.linkedin.com/in/taerim-kim-39563b250/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-icon"
        >
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </a>

        <a 
          href="/TaerimKim_Resume.pdf" 
          download 
          className="nav-icon"
        >
          <FontAwesomeIcon icon={faFileDownload} /> Resume
        </a>
      </div>
    </nav>
  );
}

export default Navbar;