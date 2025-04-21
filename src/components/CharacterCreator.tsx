
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";
import Character from "./character/Character";
import ColorPicker from "./ui/ColorPicker";
import StyleSelector from "./ui/StyleSelector";
import { CharacterConfig, CharacterPart, PostMessagePayload } from "../types/character";
import { characterParts, colorPalettes, defaultConfig } from "../config/characterConfig";

const CharacterCreator: React.FC = () => {
  const [config, setConfig] = useState<CharacterConfig>({...defaultConfig});
  const [activePart, setActivePart] = useState<CharacterPart>(characterParts[0]);
  const characterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for messages from parent window
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
      
      // Send the configuration to the parent window
      window.parent.postMessage(payload, "*");
      toast.success("Character saved!");
    } catch (error) {
      console.error("Error saving character:", error);
      toast.error("Failed to save character");
    }
  };

  return (
    <div className="character-creator p-2 mx-auto">
      <div className="text-sm font-semibold text-center mb-2">Character Creator</div>
      
      <div className="character-display mb-4" ref={characterRef}>
        <Character config={config} />
      </div>
      
      <div className="mb-2">
        <div className="options-row border-b pb-1 mb-2">
          {characterParts.map((part) => (
            <button
              key={part.id}
              className={`option-button ${activePart.id === part.id ? "active" : ""}`}
              onClick={() => setActivePart(part)}
            >
              {part.label.charAt(0)}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="text-xs font-medium">{activePart.label} Style</div>
          <StyleSelector
            totalStyles={activePart.options}
            currentStyle={config[activePart.id as keyof CharacterConfig].style}
            onChange={handleStyleChange}
          />
        </div>
        
        <div className="mb-4">
          <div className="text-xs font-medium mb-2">{activePart.label} Color</div>
          <ColorPicker
            colors={colorPalettes[activePart.id]}
            selectedColor={config[activePart.id as keyof CharacterConfig].color}
            onChange={handleColorChange}
          />
        </div>
      </div>
      
      <button className="save-button" onClick={saveCharacter}>
        <Save className="h-4 w-4" />
        Save Character
      </button>
    </div>
  );
};

export default CharacterCreator;
