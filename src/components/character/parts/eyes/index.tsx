
import React from "react";
import { default as EyesComponent } from "../../Eyes";

interface EyesProps {
  style: number;
  color: string;
}

const Eyes: React.FC<EyesProps> = ({ style, color }) => {
  return <EyesComponent style={style} color={color} />;
};

export default Eyes;
