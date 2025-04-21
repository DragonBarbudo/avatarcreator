
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface HairProps {
  style: number;
  color: string;
}

const Hair: React.FC<HairProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'hair');

  if (!svgContent) return null;

  return (
    <g transform="scale(1) translate(0, 0)" fill={color} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default Hair;
