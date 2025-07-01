import React from "react";
import { CharacterConfig } from "../../types/character";
import { changeableColors } from "../../config/characterConfig";
import ColorPalette from "./ColorPalette";

interface ChangeableColorPickersProps {
  config: CharacterConfig;
  onColorChange: (partId: string, color: string) => void;
  isLoading: boolean;
}

const ChangeableColorPickers: React.FC<ChangeableColorPickersProps> = ({
  config,
  onColorChange,
  isLoading
}) => {
  return (
    <div className="space-y-6">
      {Object.entries(changeableColors).map(([partId, colorConfig]) => (
        <div key={partId} className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            {colorConfig.label}
          </h4>
          <ColorPalette
            colors={colorConfig.palette}
            selectedColor={config[partId as keyof CharacterConfig]?.color || colorConfig.defaultColor}
            onColorChange={(color) => onColorChange(partId, color)}
            isLoading={isLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default ChangeableColorPickers;