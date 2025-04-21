
import React from "react";
import FaceShape1 from './FaceShape1';
import FaceShape2 from './FaceShape2';
import FaceShape3 from './FaceShape3';

interface FaceProps {
  style: number;
  color: string;
}

const Face: React.FC<FaceProps> = ({ style, color }) => {
  switch (style) {
    case 1:
      return <FaceShape1 color={color} />;
    case 2:
      return <FaceShape2 color={color} />;
    default:
      return <FaceShape3 color={color} />;
  }
};

export default Face;
