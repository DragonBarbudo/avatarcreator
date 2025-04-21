
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface EyesProps {
  style: number;
  color: string;
}

const Eyes: React.FC<EyesProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'eyes');

  if (!svgContent) return null;

  return (
    <g fill={color} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default Eyes;
