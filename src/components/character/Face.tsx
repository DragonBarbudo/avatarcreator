
import React from "react";
import { useSvgPath } from "../../hooks/useSvgPath";

interface FaceProps {
  style: number;
  color: string;
}

const Face: React.FC<FaceProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'face');
  
  return (
    <g 
      className="character-face"
      style={{ "--part-color": color } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};

export default Face;
