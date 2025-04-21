
import React from "react";
import { default as ShirtComponent } from "../../Shirt";

interface ShirtProps {
  style: number;
  color: string;
}

const Shirt: React.FC<ShirtProps> = ({ style, color }) => {
  return <ShirtComponent style={style} color={color} />;
};

export default Shirt;
