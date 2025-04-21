import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Save, UserRound, CircleUserRound, Eye, User, Palette } from "lucide-react";
import Character from "./character/Character";
import { CharacterConfig, CharacterPart, PostMessagePayload } from "../types/character";
import { characterParts, defaultConfig, colorPalettes } from "../config/characterConfig";
import { Card, CardContent } from "./ui/card";
import PartPreview from "./ui/PartPreview";

const partIcons: { [key: string]: React.ReactNode } = {
  face: <UserRound size={18} />,
  hair: <User size={18} />,
  eyes: <Eye size={18} />,
  mouth: <CircleUserRound size={18} />
};

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
      const previewConfig = {
        ...defaultConfig,
        [currentPart.id]: {
          style: i,
          color: config[currentPart.id as keyof CharacterConfig].color,
        }
      };
      
      previews.push(
        <PartPreview
          key={i}
          label={`Estilo ${i + 1}`}
          style={i}
          color={config[currentPart.id as keyof CharacterConfig].color}
          isSelected={config[currentPart.id as keyof CharacterConfig].style === i}
          onClick={() => handleStyleChange(i)}
        >
          <Character
            config={previewConfig}
          />
        </PartPreview>
      );
    }
    
    return previews;
  };

  const getCurrentColorPalette = () => {
    return colorPalettes[activePart.id] || [];
  };

  return (
    <Card className="character-creator w-[380px] h-[420px] overflow-hidden">
      <CardContent className="flex flex-col h-full p-2 gap-2">
        <div className="character-display bg-secondary/30 rounded-lg p-2" ref={characterRef}>
          <Character config={config} />
        </div>
        
        <div className="flex-1 flex gap-2 min-h-0">
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
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
                >
                  {partIcons[part.id]}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {renderPartPreviews()}
              </div>
            </div>

            <button className="save-button py-1.5" onClick={saveCharacter}>
              <Save className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            {getCurrentColorPalette().map((color) => (
              <button
                key={color}
                className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
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
      </CardContent>
    </Card>
  );
};

export default CharacterCreator;
