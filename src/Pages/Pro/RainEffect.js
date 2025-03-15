import React, { useEffect } from "react";
import "./RainEffect.css";

const RainEffect = () => {
  useEffect(() => {
    const makeItRain = () => {
      document.querySelector(".rain.front-row").innerHTML = "";
      document.querySelector(".rain.back-row").innerHTML = "";

      let increment = 0;
      let drops = "";
      let backDrops = "";

      while (increment < 100) {
        let randoHundo = Math.floor(Math.random() * 98) + 1;
        let randoFiver = Math.floor(Math.random() * 4) + 2;
        increment += randoFiver;

        let animationTime = 1 + Math.random(); // Vary drop speed

        drops += `
          <div class="drop" style="
            left: ${increment}%;
            bottom: 100%;
            animation-delay: 0.${randoHundo}s;
            animation-duration: ${animationTime}s;">
            <div class="stem" style="
              animation-delay: 0.${randoHundo}s;
              animation-duration: ${animationTime}s;"></div>
            <div class="splat" style="
              animation-delay: ${animationTime}s;
              animation-duration: 0.3s;"></div>
          </div>`;
      }

      document.querySelector(".rain.front-row").innerHTML = drops;
      document.querySelector(".rain.back-row").innerHTML = backDrops;
    };

    makeItRain();
  }, []);

  return (
    <>
      <div className="rain front-row"></div>
      <div className="rain back-row"></div>
    </>
  );
};

export default RainEffect;