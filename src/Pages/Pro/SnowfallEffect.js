import React from "react";
import Snowfall from "react-snowfall";

const SnowfallEffect = () => {
  return (
    <Snowfall
      color="white" // Snowflake color
      snowflakeCount={100} // Adjust for more/less snowflakes
      wind={[-0.5, 1]} // Light wind effect
      speed={[0.5, 2]} // Snowflake speed range
      radius={[1, 4]} // Vary snowflake sizes
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
};

export default SnowfallEffect;