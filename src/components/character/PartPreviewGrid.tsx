
import React from "react";
import { CharacterConfig, CharacterPart } from "../../types/character";
import PartPreview from "../ui/PartPreview";
import Character from "./Character";

interface PartPreviewGridProps {
  activePart: CharacterPart;
  config: CharacterConfig;
  onStyleChange: (newStyle: number) => void;
}

const PartPreviewGrid: React.FC<PartPreviewGridProps> = ({
  activePart,
  config,
  onStyleChange
}) => {
  const currentPart = activePart;
  const previews = [];
  
  // Render previews for all available styles
  for (let i = 0; i < currentPart.options; i++) {
    let previewConfig;
    
    if (currentPart.id === 'hair') {
      previewConfig = {
        ...config,
        hair: {
          ...config.hair,
          frontStyle: i,
          backStyle: i, // Automatically match back hair
        }
      };
    } else {
      previewConfig = {
        ...config,
        [currentPart.id]: {
          ...config[currentPart.id as keyof CharacterConfig],
          style: i,
        }
      };
    }
    
    // Get current style value properly for comparison
    const currentPartConfig = config[currentPart.id as keyof CharacterConfig];
    let currentStyle = 0;
    
    if (currentPart.id === 'hair') {
      currentStyle = config.hair.frontStyle;
    } else if ('style' in currentPartConfig) {
      currentStyle = currentPartConfig.style;
    }
    
    previews.push(
      <PartPreview
        key={i}
        label={`Style ${i + 1}`}
        style={i}
        color={currentPartConfig.color}
        isSelected={currentStyle === i}
        onClick={() => onStyleChange(i)}
      >
        <Character config={previewConfig} />
      </PartPreview>
    );
  }
  
  return (
    <div className="grid grid-cols-4 gap-0.5 max-w-[480px] mx-auto">
      {previews.map((preview, index) => (
        <div key={index} className="max-w-[120px]">
          {preview}
        </div>
      ))}
    </div>
  );
};

export default PartPreviewGrid;
