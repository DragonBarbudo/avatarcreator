
import React from "react";
import { CharacterConfig } from "../../types/character";
import CharacterPart from "./CharacterPart";

interface CharacterProps {
  config: CharacterConfig;
}

const Character: React.FC<CharacterProps> = ({ config }) => {
  return (

      
    <svg
      viewBox="0 0 160 160"
      className="character-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <CharacterPart type="shirt" style={config.shirt.style} color={config.shirt.color} />
      <CharacterPart type="face" style={config.face.style} color={config.face.color} />
      <CharacterPart type="hair" style={config.hair.style} color={config.hair.color} />
      <CharacterPart type="eyes" style={config.eyes.style} color={config.eyes.color} />
      <CharacterPart type="mouth" style={config.mouth.style} color={config.mouth.color} />
    </svg>

  );
};

export default Character;
