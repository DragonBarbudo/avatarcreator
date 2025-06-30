
import React from "react";
import { CharacterConfig } from "../../types/character";

interface HairSelectorProps {
  config: CharacterConfig;
  onFrontHairChange: (style: number) => void;
  onBackHairChange: (style: number) => void;
  isLoading: boolean;
}

const HairSelector: React.FC<HairSelectorProps> = ({
  config,
  onFrontHairChange,
  onBackHairChange,
  isLoading
}) => {
  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-medium mb-2">Front Hair</h4>
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 23 }, (_, i) => (
            <button
              key={`front-${i}`}
              className={`aspect-square rounded border text-xs transition-all ${
                config.hair.frontStyle === i
                  ? "border-primary bg-accent text-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onFrontHairChange(i)}
              disabled={isLoading}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Back Hair</h4>
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 18 }, (_, i) => (
            <button
              key={`back-${i}`}
              className={`aspect-square rounded border text-xs transition-all ${
                config.hair.backStyle === i
                  ? "border-primary bg-accent text-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onBackHairChange(i)}
              disabled={isLoading}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HairSelector;
