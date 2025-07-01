
import React, { useState } from "react";
import { CharacterConfig, CharacterPart } from "../types/character";
import { characterParts, defaultConfig, colorPalettes } from "../config/characterConfig";
import { Card, CardContent } from "./ui/card";
import CharacterPreview from "./character/CharacterPreview";
import PartSelector from "./character/PartSelector";
import ColorPalette from "./character/ColorPalette";
import PartPreviewGrid from "./character/PartPreviewGrid";
import SaveButton from "./character/SaveButton";
import { useConfigLoader } from "../hooks/useConfigLoader";
import { useSaveCharacter } from "../hooks/useSaveCharacter";

const CharacterCreator: React.FC = () => {
  const [config, setConfig] = useState<CharacterConfig>({...defaultConfig});
  const [activePart, setActivePart] = useState<CharacterPart>(characterParts[0]);
  
  const { isLoading, loadingProgress } = useConfigLoader();
  const { saveCharacter, characterRef } = useSaveCharacter();

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
    <Card className="character-creator w-[800px] h-[600px] overflow-hidden relative">
      <CardContent className="flex flex-col h-full p-4 gap-4">
        <div className="character-display bg-secondary/30 rounded-lg p-4 relative" ref={characterRef}>
          <CharacterPreview 
            config={config} 
            isLoading={isLoading} 
            loadingProgress={loadingProgress}
          />
        </div>

        <div className="flex-1 flex gap-4 min-h-0">
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <PartSelector 
              characterParts={characterParts} 
              activePart={activePart} 
              setActivePart={setActivePart}
              isLoading={isLoading}
            />
            
            {activePart.id === 'colors' ? (
              <ColorPalette 
                colors={getCurrentColorPalette()}
                selectedColor={config[activePart.id as keyof CharacterConfig]?.color || colorPalettes.colors[0]}
                onColorChange={handleColorChange}
                isLoading={isLoading}
              />
            ) : null}

            <div className="flex-1 overflow-y-auto">
              {activePart.id !== 'colors' ? (
                <PartPreviewGrid
                  activePart={activePart}
                  config={config}
                  onStyleChange={handleStyleChange}
                />
              ) : (
                <div className="grid grid-cols-4 gap-2 max-w-[480px] mx-auto">
                  {getCurrentColorPalette().map((color, index) => (
                    <button
                      key={index}
                      className={`aspect-square rounded-lg border-2 transition-all hover:scale-105 max-w-[120px] ${
                        config[activePart.id as keyof CharacterConfig]?.color === color
                          ? "border-primary ring-2 ring-primary ring-offset-2"
                          : "border-border"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      disabled={isLoading}
                    />
                  ))}
                </div>
              )}
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
