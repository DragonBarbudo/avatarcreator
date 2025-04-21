
import React from "react";
import { default as MouthComponent } from "../../Mouth";

interface MouthProps {
  style: number;
  color: string;
}

const Mouth: React.FC<MouthProps> = ({ style, color }) => {
  return <MouthComponent style={style} color={color} />;
};

export default Mouth;
