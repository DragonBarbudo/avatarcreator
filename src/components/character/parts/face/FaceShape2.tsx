
import React from "react";

interface FaceShape2Props {
  color: string;
}

const FaceShape2: React.FC<FaceShape2Props> = ({ color }) => (
  <path
    d="M85 50C85 25 70 20 50 20C30 20 15 25 15 50V90C15 110 30 130 50 130C70 130 85 110 85 90V50Z"
    fill={color}
  />
);

export default FaceShape2;
