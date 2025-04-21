
import React from "react";

interface EyesProps {
  style: number;
  color: string;
}

const Eyes: React.FC<EyesProps> = ({ style, color }) => {
  const eyeStyle = {
    fill: color,
    stroke: "#000",
    strokeWidth: "1",
  };

  switch (style) {
    case 1:
      // Round eyes
      return (
        <>
          <circle cx="35" cy="70" r="5" style={eyeStyle} />
          <circle cx="65" cy="70" r="5" style={eyeStyle} />
        </>
      );
    case 2:
      // Sleepy eyes
      return (
        <>
          <ellipse cx="35" cy="70" rx="5" ry="3" style={eyeStyle} />
          <ellipse cx="65" cy="70" rx="5" ry="3" style={eyeStyle} />
        </>
      );
    case 3:
      // Star eyes
      return (
        <>
          <path
            d="M35 65L37 70L42 70L38 73L40 78L35 75L30 78L32 73L28 70L33 70L35 65Z"
            style={eyeStyle}
          />
          <path
            d="M65 65L67 70L72 70L68 73L70 78L65 75L60 78L62 73L58 70L63 70L65 65Z"
            style={eyeStyle}
          />
        </>
      );
    // Default case (0)
    default:
      // Default eyes
      return (
        <>
          <ellipse cx="35" cy="70" rx="6" ry="4" style={eyeStyle} />
          <ellipse cx="65" cy="70" rx="6" ry="4" style={eyeStyle} />
        </>
      );
  }
};

export default Eyes;
