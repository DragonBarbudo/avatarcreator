import React from 'react';
import { CharacterConfig } from '../../types/character';
import ColorListSlider from '../ui/HueSlider'; // The component is renamed in spirit, but the file is the same
import { changeableColors } from '../../config/characterConfig';
import { Label } from '../ui/label';

interface ChangeableColorPickersProps {
  config: CharacterConfig;
  onColorChange: (partId: string, color: string) => void;
}

const ChangeableColorPickers: React.FC<ChangeableColorPickersProps> = ({
  config,
  onColorChange,
}) => {
  const parts = Object.keys(changeableColors) as (keyof typeof changeableColors)[];

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-medium text-foreground">Colors</h3>
      <div className="space-y-6">
        {parts.map((partId) => {
          const partData = changeableColors[partId];
          const partConfig = config[partId];
          if (!partConfig || typeof partConfig === 'string' || !('color' in partConfig)) return null;

          const color = partConfig.color;

          return (
            <div key={partId} className="space-y-3">
              <Label htmlFor={`slider-${partId}`} className="text-sm font-medium">
                {partData.label}
              </Label>
              <ColorListSlider
                colors={partData.colors}
                value={color}
                onChange={(newColor) => onColorChange(partId, newColor)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChangeableColorPickers;
