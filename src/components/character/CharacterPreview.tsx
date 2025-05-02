
import React from "react";
import { CharacterConfig } from "../../types/character";
import Character from "./Character";
import { Progress } from "../ui/progress";

interface CharacterPreviewProps {
  config: CharacterConfig;
  isLoading: boolean;
  loadingProgress: number;
}

const CharacterPreview: React.FC<CharacterPreviewProps> = ({ 
  config, 
  isLoading, 
  loadingProgress 
}) => {
  return (
    <div className="character-display bg-secondary/30 rounded-lg p-2 relative">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10 rounded-lg">
          <div className="text-primary font-medium mb-2">Loading character...</div>
          <div className="w-3/4">
            <Progress value={loadingProgress} className="h-2" />
          </div>
        </div>
      )}
      <Character config={config} />
    </div>
  );
};

export default CharacterPreview;
