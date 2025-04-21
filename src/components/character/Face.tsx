
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface FaceProps {
  style: number;
  color: string;
}

const Face: React.FC<FaceProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'face');

  if (!svgContent) return null;

  return (
    <g transform="scale(1) translate(0, 0)" fill={color} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default Face;
