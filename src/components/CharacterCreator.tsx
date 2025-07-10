
import React, { useState, useEffect } from "react";
import { CharacterConfig, CharacterPart } from "../types/character";
import { defaultConfig, hairColors, faceColors, shirtColors } from "../config/characterConfig";
import { Card, CardContent } from "./ui/card";
import CharacterPreview from "./character/CharacterPreview";
import PartSelector from "./character/PartSelector";
import PartPreviewGrid from "./character/PartPreviewGrid";

import SaveButton from "./character/SaveButton";
import { useConfigLoader } from "../hooks/useConfigLoader";
import { useSaveCharacter } from "../hooks/useSaveCharacter";
import { Button } from "./ui/button"; // Import Button component
import useCharacterParts from "../hooks/useCharacterParts";

const CharacterCreator: React.FC = () => {
  const { characterParts, loading: partsLoading } = useCharacterParts();
  const [config, setConfig] = useState<CharacterConfig>({...defaultConfig});
  const [activePart, setActivePart] = useState<CharacterPart | null>(null);
  
  const { isLoading, loadingProgress } = useConfigLoader();
  const { saveCharacter, characterRef } = useSaveCharacter();

  useEffect(() => {
    if (characterParts.length > 0) {
      setActivePart(characterParts[0]);
    }
  }, [characterParts]);

  // Run randomize on initial load
  useEffect(() => {
    if (!partsLoading && characterParts.length > 0) {
      handleRandomize();
    }
  }, [partsLoading, characterParts]);

  const handleStyleChange = (newStyle: number) => {
    if (activePart && activePart.id === 'hair') {
      setConfig({
        ...config,
        hair: {
          ...config.hair,
          frontStyle: newStyle,
          backStyle: newStyle,
        },
      });
    } else if (activePart) {
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
    if (activePart) {
      setConfig({
        ...config,
        [activePart.id]: {
          ...config[activePart.id as keyof CharacterConfig],
          color: newColor,
        },
      });
    }
  };

  const handleChangeableColorChange = (partId: string, color: string) => {
    setConfig({
      ...config,
      [partId]: {
        ...config[partId as keyof CharacterConfig],
        color: color,
      },
    });
  };

  const handleSaveCharacter = () => {
    saveCharacter(config);
  };

  const handleRandomize = () => {
    // Randomize styles and colors
    const newConfig: CharacterConfig = { ...config };

    // Randomize styles for all parts
    characterParts.forEach(part => {
      if (part.id === 'colors') return;
      const randomStyle = Math.floor(Math.random() * part.options);
      if (part.id === 'hair') {
        newConfig.hair.frontStyle = randomStyle;
        newConfig.hair.backStyle = randomStyle;
      } else {
        (newConfig[part.id as keyof CharacterConfig] as any).style = randomStyle;
      }
    });

    // Randomize colors from the new lists
    newConfig.hair.color = hairColors[Math.floor(Math.random() * hairColors.length)];
    newConfig.face.color = faceColors[Math.floor(Math.random() * faceColors.length)];
    newConfig.shirt.color = shirtColors[Math.floor(Math.random() * shirtColors.length)];

    setConfig(newConfig);
  };

  if (partsLoading) {
    return <div>Loading character parts...</div>;
  }

  return (
    <Card className="character-creator w-full max-w-4xl mx-auto relative">
      <CardContent className="p-4">
        <Button 
          onClick={handleRandomize} 
          className="absolute top-4 left-4 z-10"
          disabled={isLoading || partsLoading}
        >
          Randomize
        </Button>
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Columna del Avatar */}
          <div className="character-display bg-secondary/30 rounded-lg p-4 relative h-96 md:h-auto" ref={characterRef}>
            <CharacterPreview 
              config={config} 
              isLoading={isLoading} 
              loadingProgress={loadingProgress}
            />
          </div>

          {/* Columna de Controles */}
          <div className="flex flex-col gap-4 mt-4 md:mt-0">
            {activePart && (
              <PartSelector 
                characterParts={characterParts} 
                activePart={activePart} 
                setActivePart={setActivePart}
                isLoading={isLoading || partsLoading}
              />
            )}
            
            <div className="flex-1 overflow-y-auto min-h-[200px]">
              {activePart && activePart.id !== 'colors' ? (
                <PartPreviewGrid
                  activePart={activePart}
                  config={config}
                  onStyleChange={handleStyleChange}
                  onColorChange={handleChangeableColorChange}
                />
              ) : null}
            </div>

            <SaveButton 
              onSave={handleSaveCharacter}
              isLoading={isLoading || partsLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCreator;
