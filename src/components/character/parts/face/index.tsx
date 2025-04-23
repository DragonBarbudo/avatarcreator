
import React from "react";
import { default as FaceComponent } from "../../Face";

interface FaceProps {
  style: number;
  color: string;
}

const Face: React.FC<FaceProps> = ({ style, color }) => {
  return <FaceComponent style={style} color={color} />;
};

export default Face;
