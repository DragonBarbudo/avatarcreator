
import React from "react";
import { useSvgPath } from "../../hooks/useSvgPath";

interface HairProps {
  style: number;
  color: string;
}

const Hair: React.FC<HairProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'hair');
  
  return (
    <g 
      className="character-hair"
      style={{ "--part-color": color } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};

export default Hair;
