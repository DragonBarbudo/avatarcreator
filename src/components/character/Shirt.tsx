
import React from "react";

interface ShirtProps {
  style: number;
  color: string;
}

const Shirt: React.FC<ShirtProps> = ({ style, color }) => {
  switch (style) {
    case 1:
      // V-neck shirt
      return (
        <path
          d="M20 140C20 140 25 115 35 110C40 107 45 108 50 110C55 108 60 107 65 110C75 115 80 140 80 140H20Z"
          fill={color}
        />
      );
    case 2:
      // Collar shirt
      return (
        <path
          d="M20 140C20 140 25 120 30 112C35 110 38 113 40 115C45 118 50 118 55 115C57 113 60 110 65 112C70 120 80 140 80 140H20Z"
          fill={color}
        />
      );
    // Default case (0)
    default:
      // Crewneck shirt
      return (
        <path
          d="M20 140C20 140 25 125 35 120C40 118 45 117 50 117C55 117 60 118 65 120C75 125 80 140 80 140H20Z"
          fill={color}
        />
      );
  }
};

export default Shirt;
