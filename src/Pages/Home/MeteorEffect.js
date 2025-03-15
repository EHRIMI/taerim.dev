import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Keyframe animation for meteors falling diagonally
const MeteorKeyframe = (direction, angle) => keyframes`
  0% {
    top: -10vh;
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    top: 110vh;
    transform: translateX(${direction === "left" ? "-" : "+"}${120 / Math.tan((angle * Math.PI) / 180)}vh);
    opacity: 1;
  }
`;

// Meteor container
const MeteorEffectLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;

  .star {
    position: absolute;
    top: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: white;
    opacity: 0;
    animation: ${(props) => MeteorKeyframe(props.$direction, props.$angle)} 4s ease-in infinite;
  }

  .star::after {
    content: "";
    position: absolute;
    top: calc(50% - 1px);
    left: -950%;
    width: 2000%;
    height: 2px;
    background: linear-gradient(to left, #fff0, #ffffff);
    transform: ${(props) => (props.$direction === "left" ? `rotateZ(-${props.$angle}deg)` : `rotateZ(-${180 - props.$angle}deg)`)} translateX(50%);
  }
`;

const MAX_STAR_COUNT = 50;
const colors = ["#c77eff", "#f6ff7e", "#ff8d7e", "#ffffff"];

export default function MeteorEffect({ count = 12, maxDelay = 15, minSpeed = 2, maxSpeed = 4, angle = 30, direction = "right" }) {
  const starCount = Math.min(count, MAX_STAR_COUNT);
  const [starInterval, setStarInterval] = useState(0);

  useEffect(() => {
    const calcStarInterval = () => {
      let innerWidth = window.innerWidth;
      setStarInterval(Math.floor((innerWidth * 1.5) / (count * 5)));
    };

    calcStarInterval();
    window.addEventListener("resize", calcStarInterval);
    return () => window.removeEventListener("resize", calcStarInterval);
  }, [count]);

  return (
    <MeteorEffectLayout $direction={direction} $angle={angle}>
      {new Array(starCount).fill(0).map((_, idx) => {
        const left = direction === "left" ? `${Math.random() * count * 5 * starInterval}px` : `${window.innerHeight - Math.random() * count * 5 * starInterval}px`;
        const animationDelay = `${Math.random() * maxDelay}s`;
        const animationDuration = maxSpeed > minSpeed ? `${minSpeed + Math.random() * maxSpeed}s` : `${2 + Math.random() * 4}`;
        const colorIndex = Math.floor(Math.random() * colors.length);
        const size = `${2 + Math.floor(Math.random() * 5)}px`;
        const boxShadow = `0px 0px 10px 3px ${colors[colorIndex]}`;

        return <div key={idx} style={{ left, animationDelay, animationDuration, boxShadow, width: size, height: size }} className="star"></div>;
      })}
    </MeteorEffectLayout>
  );
}