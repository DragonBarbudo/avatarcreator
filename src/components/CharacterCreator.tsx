import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Save, Palette, Shirt, Eye, CircleUser, Frown, CircleUserRound } from "lucide-react";
import Character from "./character/Character";
import ColorPicker from "./ui/ColorPicker";
import StyleSelector from "./ui/StyleSelector";
import { CharacterConfig, CharacterPart, PostMessagePayload } from "../types/character";
import { characterParts, colorPalettes, defaultConfig } from "../config/characterConfig";
import { Card, CardContent, CardHeader } from "./ui/card";

const partIcons = {
  face: CircleUserRound,
  hair: Frown,
  eyes: Eye,
  mouth: CircleUser,
  shirt: Shirt,
};

const CharacterCreator: React.FC = () => {
  const [config, setConfig] = useState<CharacterConfig>({...defaultConfig});
  const [activePart, setActivePart] = useState<CharacterPart>(characterParts[0]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "loadConfig" && event.data.config) {
        try {
          setConfig(event.data.config);
          toast.success("Character configuration loaded");
        } catch (error) {
          console.error("Failed to load configuration:", error);
          toast.error("Failed to load configuration");
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleStyleChange = (newStyle: number) => {
    setConfig({
      ...config,
      [activePart.id]: {
        ...config[activePart.id as keyof CharacterConfig],
        style: newStyle,
      },
    });
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

  const saveCharacter = async () => {
    if (!characterRef.current) return;

    try {
      const svgElement = characterRef.current.querySelector("svg");
      if (!svgElement) throw new Error("SVG element not found");

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 450;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      const img = new Image();
      img.src = URL.createObjectURL(svgBlob);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const pngDataUrl = canvas.toDataURL("image/png");
      
      const payload: PostMessagePayload = {
        type: "save",
        config,
        imageData: pngDataUrl,
      };
      
      window.parent.postMessage(payload, "*");
      toast.success("Character saved!");
    } catch (error) {
      console.error("Error saving character:", error);
      toast.error("Failed to save character");
    }
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <Card className="character-creator p-3">
      <CardHeader className="p-0 space-y-0 mb-2">
        <div className="text-lg font-semibold text-center">Creador de Personaje</div>
      </CardHeader>
      
      <CardContent className="p-0 space-y-4">
        <div className="character-display" ref={characterRef}>
          <Character config={config} />
        </div>
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <div className="text-sm font-medium mb-2">Seleccionar Parte</div>
            <div className="options-row">
              {characterParts.map((part) => {
                const IconComponent = partIcons[part.id as keyof typeof partIcons];
                return (
                  <button
                    key={part.id}
                    className={`option-button ${activePart.id === part.id ? "active" : ""}`}
                    onClick={() => setActivePart(part)}
                    title={part.label}
                  >
                    <IconComponent className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Estilo de {activePart.label}</div>
                <StyleSelector
                  totalStyles={activePart.options}
                  currentStyle={config[activePart.id as keyof CharacterConfig].style}
                  onChange={handleStyleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Color de {activePart.label}</div>
                <button 
                  className="option-button"
                  onClick={toggleColorPicker}
                  title="Seleccionar color"
                >
                  <Palette className="h-4 w-4" />
                </button>
              </div>
              {showColorPicker && (
                <ColorPicker
                  colors={colorPalettes[activePart.id]}
                  selectedColor={config[activePart.id as keyof CharacterConfig].color}
                  onChange={handleColorChange}
                />
              )}
            </div>
          </div>
        </div>
        
        <button className="save-button" onClick={saveCharacter}>
          <Save className="h-4 w-4" />
          Guardar Personaje
        </button>
      </CardContent>
    </Card>
  );
};

export default CharacterCreator;
