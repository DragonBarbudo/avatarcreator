
import React from "react";
import { CharacterConfig } from "../../types/character";
import FaceShape from "./FaceShape";
import Hair from "./Hair";
import Eyes from "./Eyes";
import Mouth from "./Mouth";
import Shirt from "./Shirt";

interface CharacterProps {
  config: CharacterConfig;
}

const Character: React.FC<CharacterProps> = ({ config }) => {
  return (
    <svg
      viewBox="0 0 100 150"
      className="character-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <FaceShape
        style={config.face.style}
        color={config.face.color}
      />
      <Hair
        style={config.hair.style}
        color={config.hair.color}
      />
      <Eyes
        style={config.eyes.style}
        color={config.eyes.color}
      />
      <Mouth
        style={config.mouth.style}
        color={config.mouth.color}
      />
      <Shirt
        style={config.shirt.style}
        color={config.shirt.color}
      />
    </svg>
  );
};

export default Character;
