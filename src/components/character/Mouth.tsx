
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface MouthProps {
  style: number;
  color: string;
}

const Mouth: React.FC<MouthProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'mouth');

  if (!svgContent) return null;

  return (
    <g fill={color} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default Mouth;
