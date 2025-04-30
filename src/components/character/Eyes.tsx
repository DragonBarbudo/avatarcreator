
import React from "react";
import { useSvgPath } from "../../hooks/useSvgPath";

interface EyesProps {
  style: number;
  color: string;
}

const Eyes: React.FC<EyesProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'eyes');
  
  return (
    <g 
      className="character-eyes"
      style={{ "--part-color": color } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};

export default Eyes;
