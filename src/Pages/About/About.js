import React, { useEffect, useState } from "react";
import "./About.css";

function About() {
  const [stars, setStars] = useState([]);
  const [transformedCards, setTransformedCards] = useState({});
  const [showTMI, setShowTMI] = useState(false);

  useEffect(() => {
    const numStars = 50;
    let starArray = [];

    for (let i = 0; i < numStars; i++) {
      starArray.push({
        id: i,
        top: Math.random() * 100 + "vh",
        left: Math.random() * 100 + "vw",
        animationDelay: Math.random() * 3 + "s",
      });
    }

    setStars(starArray);
  }, []);

  const skills = [
    { name: "JavaScript", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "C", level: "Intermediate" },
    { name: "Java", level: "Advanced" },
    { name: "Swift", level: "Intermediate" },
    { name: "CSS", level: "Advanced" },
  ];

  const toggleTransform = (index) => {
    setTransformedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="about-container">
      <div className="about-background">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
            }}
          ></div>
        ))}
      </div>
      <h1>About Me</h1>
      <p className="text">
        My name is Taerim Kim. I am a South Korean currently studying CS at Virginia Tech.
        I'm also a developer passionate about building artistic and creative digital experiences.
        Bg music is my favorite classical music piece- Reflets dans l'eau by Debussy. 
        Hope you like it!
      </p>
      <img src="/duggoweb.png" width="120"/>
      <img src="/duggoweb2.png" width="180"/>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-card"
            onClick={() => toggleTransform(index)}
          >
            <div
              className={`skill-inner ${transformedCards[index] ? "transformed" : ""}`}
            >
              <div className="skill-front">{skill.name}</div>
              <div className="skill-back">{skill.level}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="tmi-button" onClick={() => setShowTMI(!showTMI)}>💭</button>


      {showTMI && (
        <div className="tmi-popup">
          <div className="tmi-content">
            <h3>TMI About Tae</h3>
            <p>I started coding because I was inspired by game "Stardew Valley"</p>
            <p>My coding playlist is 30% classical music, 30% jazz, 30% hip-hop, 10% k-pop 🎶</p>
            <p>I am great at cooking korean food!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default About;