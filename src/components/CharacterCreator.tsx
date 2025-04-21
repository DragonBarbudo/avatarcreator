import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Save, Palette, Shirt, Eye, CircleUser, Frown, CircleUserRound } from "lucide-react";
import Character from "./character/Character";
import ColorPicker from "./ui/ColorPicker";
import StyleSelector from "./ui/StyleSelector";
import { CharacterConfig, CharacterPart, PostMessagePayload } from "../types/character";
import { characterParts, colorPalettes, defaultConfig } from "../config/characterConfig";
import { Card, CardContent, CardHeader } from "./ui/card";
import PartPreview from "./ui/PartPreview";

const colorOptions = [
  "#9b87f5", // Primary Purple
  "#F97316", // Bright Orange
  "#0EA5E9", // Ocean Blue
  "#22C55E", // Green
  "#EC4899", // Pink
  "#6B7280", // Gray
];

const CharacterCreator: React.FC = () => {
  const [config, setConfig] = useState<CharacterConfig>({...defaultConfig});
  const [activePart, setActivePart] = useState<CharacterPart>(characterParts[0]);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "loadConfig" && event.data.config) {
        try {
          setConfig(event.data.config);
          toast.success("Configuración cargada");
        } catch (error) {
          console.error("Error al cargar la configuración:", error);
          toast.error("Error al cargar la configuración");
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

  const renderPartPreviews = () => {
    const currentPart = activePart;
    const previews = [];
    
    for (let i = 0; i < currentPart.options; i++) {
      previews.push(
        <PartPreview
          key={i}
          label={`Estilo ${i + 1}`}
          style={i}
          color={config[currentPart.id as keyof CharacterConfig].color}
          isSelected={config[currentPart.id as keyof CharacterConfig].style === i}
          onClick={() => handleStyleChange(i)}
        >
          <div className="w-16 h-16">
            <Character
              config={{
                ...defaultConfig,
                [currentPart.id]: {
                  style: i,
                  color: config[currentPart.id as keyof CharacterConfig].color,
                },
              }}
            />
          </div>
        </PartPreview>
      );
    }
    
    return previews;
  };

  return (
    <Card className="character-creator w-[480px] p-4">
      <CardHeader className="p-0 space-y-0 mb-4">
        <div className="text-xl font-semibold text-center">Tu Avatar</div>
      </CardHeader>
      
      <CardContent className="p-0 space-y-6">
        <div className="character-display bg-secondary/30 rounded-lg p-6" ref={characterRef}>
          <Character config={config} />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-secondary/30">
            {characterParts.map((part) => (
              <button
                key={part.id}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activePart.id === part.id 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-secondary"
                }`}
                onClick={() => setActivePart(part)}
              >
                {part.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {renderPartPreviews()}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Seleccionar Color
              </div>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                      config[activePart.id as keyof CharacterConfig].color === color
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-border"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <button className="save-button w-full" onClick={saveCharacter}>
          <Save className="h-4 w-4" />
          Guardar Avatar
        </button>
      </CardContent>
    </Card>
  );
};

export default CharacterCreator;
