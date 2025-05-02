
import React from "react";
import { useSvgPath } from "../../hooks/useSvgPath";

interface CharacterPartProps {
  type: string;
  style: number;
  color: string;
}

const CharacterPart: React.FC<CharacterPartProps> = ({ type, style, color }) => {
  const svgContent = useSvgPath(style, type);
  
  return (
    <g 
      className={`character-${type}`}
      style={{ "--part-color": color } as React.CSSProperties}
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};

export default CharacterPart;
