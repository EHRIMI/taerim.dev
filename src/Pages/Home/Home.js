import React from "react";
import "./Home.css";
import MeteorEffect from "./MeteorEffect"; // Import the meteor effect

function Home() {
  return (
    <div className="home">
      <MeteorEffect count={12} angle={40} direction="right" /> {/* Meteors in background */}
      <div className="content">
        <h1>Welcome to Tae's Website</h1>
        <p>Bringing ideas to life with code, design, and creativity.</p>
        {/* <a href="/resume.pdf" download className="resume-button">
          Download Resume
        </a> */}
      </div>
    </div>
  );
}

export default Home;