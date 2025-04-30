
import React from "react";

interface FaceProps {
  style: number;
  color: string;
}

const Face: React.FC<FaceProps> = ({ color }) => {
  return (
    <g className="character-face" style={{ "--part-color": color } as React.CSSProperties}>
      <circle cx="80" cy="80" r="40" className="colorable" />
    </g>
  );
};

export default Face;
