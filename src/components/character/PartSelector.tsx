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
  eyes: <Icon icon="mingcute:eye-2-fill" width="20" />,
  hair: <Icon icon="mingcute:hair-2-fill" width="20" />,
  brows: <Icon icon="mingcute:eyebrow-fill" width="20" />,
  nose: <Icon icon="mingcute:nose-fill" width="20" />,
  mouth: <Icon icon="mingcute:mouth-fill" width="20" />,
  face: <Icon icon="mingcute:face-fill" width="20" />,
  shirt: <Icon icon="mingcute:t-shirt-fill" width="20" />
};

const partLabels: { [key: string]: string } = {
  eyes: "Ojos",
  hair: "Cabello",
  brows: "Cejas",
  nose: "Nariz",
  mouth: "Boca",
  face: "Cara",
  shirt: "Ropa"
};

const PartSelector: React.FC<PartSelectorProps> = ({ 
  characterParts, 
  activePart, 
  setActivePart,
  isLoading
}) => {
  return (
    <div className="flex items-center flex-wrap justify-center gap-2 p-2 rounded-lg bg-secondary/30 overflow-x-auto">
      
      {characterParts.map((part) => (
        <button
          key={part.id}
          className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 min-w-[60px] ${
            activePart.id === part.id 
              ? "bg-primary text-primary-foreground shadow-md scale-105" 
              : "hover:bg-secondary hover:shadow-sm"
          }`}
          onClick={() => setActivePart(part)}
          disabled={isLoading}
          title={partLabels[part.id]}
        >
          {partIcons[part.id]}
          <span className="whitespace-nowrap">{partLabels[part.id]}</span>
        </button>
      ))}
    </div>
  );
};

export default PartSelector;
