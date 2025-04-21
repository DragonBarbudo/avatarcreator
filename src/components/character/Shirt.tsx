
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface ShirtProps {
  style: number;
  color: string;
}

const Shirt: React.FC<ShirtProps> = ({ style, color }) => {
  const pathData = useSvgPath(style, 'shirt');

  if (!pathData) return null;

  return (
    <g transform="scale(0.4) translate(20, 250)">
      <path d={pathData} fill={color} />
    </g>
  );
};

export default Shirt;
