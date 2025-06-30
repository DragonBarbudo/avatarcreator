
import React from "react";
import { Icon } from "@iconify/react";
import { CharacterPart } from "../../types/character";

interface PartSelectorProps {
  characterParts: CharacterPart[];
  activePart: CharacterPart;
  setActivePart: (part: CharacterPart) => void;
  isLoading: boolean;
}

const partIcons: { [key: string]: React.ReactNode } = {
  eyes: <Icon icon="mingcute:eye-2-fill" width="24" />,
  hair: <Icon icon="mingcute:hair-2-fill" width="24" />,
  brows: <Icon icon="material-symbols:eyebrow-outline" width="24" />,
  nose: <Icon icon="material-symbols:nose" width="24" />,
  mouth: <Icon icon="mingcute:mouth-fill" width="24" />,
  face: <Icon icon="mingcute:face-fill" width="24" />,
  shirt: <Icon icon="mingcute:t-shirt-fill" width="24" />
};

const PartSelector: React.FC<PartSelectorProps> = ({ 
  characterParts, 
  activePart, 
  setActivePart,
  isLoading
}) => {
  return (
    <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-secondary/30 overflow-x-auto">
      {characterParts.map((part) => (
        <button
          key={part.id}
          className={`p-2 rounded-md text-sm transition-colors flex-shrink-0 ${
            activePart.id === part.id 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-secondary"
          }`}
          onClick={() => setActivePart(part)}
          disabled={isLoading}
          title={part.label}
        >
          {partIcons[part.id]}
        </button>
      ))}
    </div>
  );
};

export default PartSelector;
