
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
  face: <Icon icon="mingcute:face-fill" width="18" />,
  hair: <Icon icon="mingcute:hair-2-fill" width="18" />,
  eyes: <Icon icon="mingcute:eye-2-fill" width="18" />,
  mouth: <Icon icon="mingcute:mouth-fill" width="18" />,
  shirt: <Icon icon="mingcute:t-shirt-fill" width="18" />
};

const PartSelector: React.FC<PartSelectorProps> = ({ 
  characterParts, 
  activePart, 
  setActivePart,
  isLoading
}) => {
  return (
    <div className="flex items-center justify-center gap-1 p-1 rounded-lg bg-secondary/30">
      {characterParts.map((part) => (
        <button
          key={part.id}
          className={`p-2 rounded-md text-sm transition-colors ${
            activePart.id === part.id 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-secondary"
          }`}
          onClick={() => setActivePart(part)}
          disabled={isLoading}
        >
          {partIcons[part.id]}
        </button>
      ))}
    </div>
  );
};

export default PartSelector;
