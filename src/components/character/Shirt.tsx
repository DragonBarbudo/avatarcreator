
import React from "react";
import { useSvgPath } from "../../hooks/useSvgPath";

interface ShirtProps {
  style: number;
  color: string;
}

const Shirt: React.FC<ShirtProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'shirt');
  
  return (
    <g 
      className="character-shirt"
      style={{ "--part-color": color } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};

export default Shirt;
