
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface EyesProps {
  style: number;
  color: string;
}

const Eyes: React.FC<EyesProps> = ({ style, color }) => {
  const pathData = useSvgPath(style, 'eyes');

  if (!pathData) return null;

  return (
    <g transform="scale(1) translate(0, 0)">
      <path d={pathData} fill={color} />
    </g>
  );
};

export default Eyes;
