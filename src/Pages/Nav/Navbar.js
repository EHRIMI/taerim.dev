import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFileDownload, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

function Navbar() {
  const audioRef = useRef(new Audio("/debussy.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Try autoplaying when the page loads
    const playMusic = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Autoplay blocked. User interaction required.");
      }
    };

    playMusic();

    // Enable music on user interaction if autoplay is blocked
    const enableAudio = () => {
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    };

    document.addEventListener("click", enableAudio, { once: true });

    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Social, Resume & Music Buttons */}
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

        {/* Music Play/Pause Button */}
        <button className="nav-icon music-button" onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} /> {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;