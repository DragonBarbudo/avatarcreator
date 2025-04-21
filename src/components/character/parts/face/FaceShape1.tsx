
import React from "react";

interface FaceShape1Props {
  color: string;
}

const FaceShape1: React.FC<FaceShape1Props> = ({ color }) => (
  <path
    d="M90 40C90 20 70 15 50 15C30 15 10 20 10 40V90C10 120 30 140 50 140C70 140 90 120 90 90V40Z"
    fill={color}
  />
);

export default FaceShape1;
