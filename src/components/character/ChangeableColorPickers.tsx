import React from "react";
import { CharacterConfig } from "../../types/character";
import { changeableColors } from "../../config/characterConfig";
import ColorPicker from "../ui/ColorPicker";
import { Icon } from "@iconify/react";


interface ChangeableColorPickersProps {
  config: CharacterConfig;
  onColorChange: (partId: string, color: string) => void;
}

const ChangeableColorPickers: React.FC<ChangeableColorPickersProps> = ({ config, onColorChange }) => {

  // Helper function to safely get the current color of a part
  const getCurrentColor = (partId: keyof typeof changeableColors): string => {
    const partConfig = config[partId];
    if (partConfig && 'color' in partConfig) {
      return partConfig.color;
    }
    return ''; // Return a fallback color or empty string if no color is found
  };

  return (
    <div className="space-y-4">
      {Object.entries(changeableColors).map(([partId, { icon, label, palette }]) => {
        const key = partId as keyof typeof changeableColors;
        const selectedColor = getCurrentColor(key);

        return (
          <div key={partId} className="grid grid-cols-3 items-center gap-4">
            <div>
              <Icon icon={icon} width="100" />
            </div>
            <div className="col-span-2">
              <ColorPicker
                colors={palette}
                selectedColor={selectedColor}
                onChange={(color) => onColorChange(partId, color)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChangeableColorPickers;
