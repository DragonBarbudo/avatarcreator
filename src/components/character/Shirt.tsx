
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface ShirtProps {
  style: number;
  color: string;
}

const Shirt: React.FC<ShirtProps> = ({ style, color }) => {
  const svgContent = useSvgPath(style, 'shirt');

  if (!svgContent) return null;

  return (
    <g transform="scale(1) translate(0, 0)" fill={color} dangerouslySetInnerHTML={{ __html: svgContent }} />
  );
};

export default Shirt;
