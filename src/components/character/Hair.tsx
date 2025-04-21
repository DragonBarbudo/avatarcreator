
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface HairProps {
  style: number;
  color: string;
}

const Hair: React.FC<HairProps> = ({ style, color }) => {
  const pathData = useSvgPath(style, 'hair');

  if (!pathData) return null;

  return (
    <g transform="scale(1) translate(0, 0)">
      <path d={pathData} fill={color} />
    </g>
  );
};

export default Hair;
