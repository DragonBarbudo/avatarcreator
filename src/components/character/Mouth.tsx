
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface MouthProps {
  style: number;
  color: string;
}

const Mouth: React.FC<MouthProps> = ({ style, color }) => {
  const pathData = useSvgPath(style, 'mouth');

  if (!pathData) return null;

  return (
    <g transform="scale(1) translate(0, 0)">
      <path d={pathData} fill={color} />
    </g>
  );
};

export default Mouth;
