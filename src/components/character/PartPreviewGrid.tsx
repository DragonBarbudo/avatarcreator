
import React from "react";
import { CharacterConfig, CharacterPart } from "../../types/character";
import PartPreview from "../ui/PartPreview";
import Character from "./Character";

interface PartPreviewGridProps {
  activePart: CharacterPart;
  config: CharacterConfig;
  existingStyles: {[key: string]: boolean};
  stylesLoading: boolean;
  onStyleChange: (newStyle: number) => void;
}

const PartPreviewGrid: React.FC<PartPreviewGridProps> = ({
  activePart,
  config,
  existingStyles,
  stylesLoading,
  onStyleChange
}) => {
  if (stylesLoading) {
    return (
      <div className="grid grid-cols-4 gap-0.5">
        {Array.from({ length: Math.min(activePart.options, 8) }).map((_, i) => (
          <div key={i} className="aspect-square rounded-lg border animate-pulse bg-secondary/50" />
        ))}
      </div>
    );
  }

  const currentPart = activePart;
  const previews = [];
  
  // Only render previews for styles that actually exist
  for (let i = 0; i < currentPart.options; i++) {
    const styleId = i + 1;
    const styleKey = `${currentPart.id}-${styleId}`;
    
    // Skip if the SVG file doesn't exist
    if (!existingStyles[styleKey]) {
      continue;
    }
    
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
    <div className="grid grid-cols-4 gap-0.5">
      {previews}
    </div>
  );
};

export default PartPreviewGrid;
