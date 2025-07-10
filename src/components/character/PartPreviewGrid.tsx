
import React from "react";
import { CharacterConfig, CharacterPart } from "../../types/character";
import PartPreview from "../ui/PartPreview";
import Character from "./Character";
import ColorListSlider from "../ui/HueSlider"; // Import the new slider
import { Label } from "../ui/label"; // Import Label
import { changeableColors } from "../../config/characterConfig"; // Import changeableColors

interface PartPreviewGridProps {
  activePart: CharacterPart;
  config: CharacterConfig;
  onStyleChange: (newStyle: number) => void;
  onColorChange: (partId: string, color: string) => void; // Add onColorChange prop
}

const PartPreviewGrid: React.FC<PartPreviewGridProps> = ({
  activePart,
  config,
  onStyleChange,
  onColorChange // Destructure onColorChange
}) => {
  const currentPart = activePart;
  const previews = [];

  const isColorChangeable = ['hair', 'face', 'shirt'].includes(currentPart.id);

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
    <div className="flex flex-col gap-4 h-80">
      {isColorChangeable && (
        <div className="space-y-3 p-4  rounded-lg">
          
          <ColorListSlider
            colors={changeableColors[currentPart.id as keyof typeof changeableColors].colors}
            value={(config[currentPart.id as keyof CharacterConfig] as any).color}
            onChange={(newColor) => onColorChange(currentPart.id, newColor)}
          />
        </div>
      )}
      <div className="grid grid-cols-5 max-w-[480px] mx-auto h-64 gap-y-1">
        {previews.map((preview, index) => (
          <div key={index} className="max-w-[100px] flex justify-center items-center">
            {preview}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartPreviewGrid;
