
import React from "react";

interface FaceShape3Props {
  color: string;
}

const FaceShape3: React.FC<FaceShape3Props> = ({ color }) => (
  <circle
    cx="50"
    cy="75"
    r="50"
    fill={color}
  />
);

export default FaceShape3;
