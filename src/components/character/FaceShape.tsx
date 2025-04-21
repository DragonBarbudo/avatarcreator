
import React from "react";

interface FaceShapeProps {
  style: number;
  color: string;
}

const FaceShape: React.FC<FaceShapeProps> = ({ style, color }) => {
  switch (style) {
    case 1:
      return (
        <path
          d="M90 40C90 20 70 15 50 15C30 15 10 20 10 40V90C10 120 30 140 50 140C70 140 90 120 90 90V40Z"
          fill={color}
        />
      );
    case 2:
      return (
        <path
          d="M85 50C85 25 70 20 50 20C30 20 15 25 15 50V90C15 110 30 130 50 130C70 130 85 110 85 90V50Z"
          fill={color}
          rx="30"
          ry="30"
        />
      );
    // Default case (0)
    default:
      return (
        <circle
          cx="50"
          cy="75"
          r="50"
          fill={color}
        />
      );
  }
};

export default FaceShape;
