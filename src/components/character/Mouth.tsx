
import React from "react";

interface MouthProps {
  style: number;
  color: string;
}

const Mouth: React.FC<MouthProps> = ({ style, color }) => {
  const mouthStyle = {
    fill: color,
    stroke: "#000",
    strokeWidth: "1",
  };

  switch (style) {
    case 1:
      // Smiling mouth
      return (
        <path
          d="M35 90C35 95 45 100 50 100C55 100 65 95 65 90"
          stroke={mouthStyle.stroke}
          strokeWidth={mouthStyle.strokeWidth}
          fill="none"
        />
      );
    case 2:
      // Open mouth
      return (
        <ellipse
          cx="50"
          cy="90"
          rx="10"
          ry="5"
          style={mouthStyle}
        />
      );
    case 3:
      // Surprised mouth
      return (
        <circle
          cx="50"
          cy="90"
          r="5"
          style={mouthStyle}
        />
      );
    // Default case (0)
    default:
      // Default mouth - slight smile
      return (
        <path
          d="M40 90C40 92 45 95 50 95C55 95 60 92 60 90"
          fill="none"
          stroke={mouthStyle.stroke}
          strokeWidth={mouthStyle.strokeWidth}
        />
      );
  }
};

export default Mouth;
