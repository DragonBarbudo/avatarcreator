
import React, { useState } from "react";
import { CharacterConfig, CharacterPart } from "../types/character";
import { characterParts, defaultConfig, colorPalettes } from "../config/characterConfig";
import { Card, CardContent } from "./ui/card";
import CharacterPreview from "./character/CharacterPreview";
import PartSelector from "./character/PartSelector";
import ColorPalette from "./character/ColorPalette";
import PartPreviewGrid from "./character/PartPreviewGrid";
import SaveButton from "./character/SaveButton";
import { useSvgExistence } from "../hooks/useSvgExistence";
import { useConfigLoader } from "../hooks/useConfigLoader";
import { useSaveCharacter } from "../hooks/useSaveCharacter";

const CharacterCreator: React.FC = () => {
  const [config, setConfig] = useState<CharacterConfig>({...defaultConfig});
  const [activePart, setActivePart] = useState<CharacterPart>(characterParts[0]);
  
  const { isLoading, loadingProgress } = useConfigLoader();
  const { saveCharacter, characterRef } = useSaveCharacter();
  const { existingStyles, isLoading: stylesLoading } = useSvgExistence(activePart.id, activePart.options);

  const handleStyleChange = (newStyle: number) => {
    if (activePart.id === 'hair') {
      setConfig({
        ...config,
        hair: {
          ...config.hair,
          frontStyle: newStyle,
          backStyle: newStyle,
        },
      });
    } else {
      setConfig({
        ...config,
        [activePart.id]: {
          ...config[activePart.id as keyof CharacterConfig],
          style: newStyle,
        },
      });
    }
  };

  const handleColorChange = (newColor: string) => {
    setConfig({
      ...config,
      [activePart.id]: {
        ...config[activePart.id as keyof CharacterConfig],
        color: newColor,
      },
    });
  };

  const handleSaveCharacter = () => {
    saveCharacter(config);
  };

  const getCurrentColorPalette = () => {
    return colorPalettes[activePart.id] || [];
  };

  return (
    <Card className="character-creator w-[380px] h-[520px] overflow-hidden relative">
      <CardContent className="flex flex-col h-full p-2 gap-2">
        <div className="character-display bg-secondary/30 rounded-lg p-2 relative" ref={characterRef}>
          <CharacterPreview 
            config={config} 
            isLoading={isLoading} 
            loadingProgress={loadingProgress}
          />
        </div>

        <div className="flex-1 flex gap-2 min-h-0">
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <PartSelector 
              characterParts={characterParts} 
              activePart={activePart} 
              setActivePart={setActivePart}
              isLoading={isLoading}
            />
            
            <ColorPalette 
              colors={getCurrentColorPalette()}
              selectedColor={config[activePart.id as keyof CharacterConfig].color}
              onColorChange={handleColorChange}
              isLoading={isLoading}
            />

            <div className="flex-1 overflow-y-auto">
              <PartPreviewGrid
                activePart={activePart}
                config={config}
                existingStyles={existingStyles}
                stylesLoading={stylesLoading}
                onStyleChange={handleStyleChange}
              />
            </div>

            <SaveButton 
              onSave={handleSaveCharacter}
              isLoading={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCreator;
