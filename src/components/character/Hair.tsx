
import React from "react";
import HairStyle4 from "./parts/hair/HairStyle4";

interface HairProps {
  style: number;
  color: string;
}

const Hair: React.FC<HairProps> = ({ style, color }) => {
  switch (style) {
    case 1:
      // Longer wavy hair
      return (
        <path
          d="M15 40C15 30 30 10 50 10C70 10 85 30 85 40V50C85 50 80 45 75 48C70 50 65 45 60 48C55 50 50 45 45 48C40 50 35 45 30 48C25 50 20 45 15 50V40Z"
          fill={color}
        />
      );
    case 2:
      // Short flat top
      return (
        <path
          d="M20 40C20 30 30 20 50 20C70 20 80 30 80 40V45C80 45 70 45 60 45C50 45 40 45 30 45C25 45 20 45 20 45V40Z"
          fill={color}
        />
      );
    case 3:
      // Curly top
      return (
        <path
          d="M15 50C15 40 15 20 25 15C30 12 40 10 50 10C60 10 70 12 75 15C85 20 85 40 85 50C85 55 80 55 75 53C70 51 65 55 60 53C55 51 50 55 45 53C40 51 35 55 30 53C25 51 20 55 15 50Z"
          fill={color}
        />
      );
    case 4:
      // New wavy style
      return <HairStyle4 color={color} />;
    // Default case (0)
    default:
      // Basic short hair
      return (
        <path
          d="M10 50C10 35 25 15 50 15C75 15 90 35 90 50V55C90 55 75 50 50 50C25 50 10 55 10 55V50Z"
          fill={color}
        />
      );
  }
};

export default Hair;
