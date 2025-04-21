
import React from 'react';
import { useSvgPath } from '../../hooks/useSvgPath';

interface FaceProps {
  style: number;
  color: string;
}

const Face: React.FC<FaceProps> = ({ style, color }) => {
  const pathData = useSvgPath(style, 'face');

  if (!pathData) return null;

  return (
    <g transform="scale(0.4) translate(20, 20)">
      <path d={pathData} fill={color} />
    </g>
  );
};

export default Face;
