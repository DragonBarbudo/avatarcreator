
import React from "react";
import { useSvgPath } from "../../hooks/useSvgPath";

interface MouthProps {
  style: number;
  color: string;
}

const Mouth: React.FC<MouthProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'mouth');
  
  return (
    <g 
      className="character-mouth"
      style={{ "--part-color": color } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};

export default Mouth;
