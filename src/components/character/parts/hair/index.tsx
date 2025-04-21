
import React from "react";
import { default as HairComponent } from "../../Hair";

interface HairProps {
  style: number;
  color: string;
}

const Hair: React.FC<HairProps> = ({ style, color }) => {
  return <HairComponent style={style} color={color} />;
};

export default Hair;
