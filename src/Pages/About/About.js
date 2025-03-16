import React, { useEffect, useState } from "react";
import "./About.css";

function About() {
  const [stars, setStars] = useState([]);
  const [transformedCards, setTransformedCards] = useState({});

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

  // List of programming languages with skill levels
  const skills = [
    { name: "JavaScript", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "C", level: "Intermediate" },
    { name: "Java", level: "Advanced" },
    { name: "Swift", level: "Intermediate" },
    { name: "CSS", level: "Advanced" },
  ];

  // Flip card on click
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
      <p>
        I'm a developer passionate about building creative and functional
        digital experiences. Hello World!
      </p>

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
    </div>
  );
}

export default About;