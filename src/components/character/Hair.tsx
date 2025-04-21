
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
    <g fill={color} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default Hair;
