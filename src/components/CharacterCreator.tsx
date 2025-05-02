
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { CharacterConfig, CharacterPart, PostMessagePayload } from "../types/character";
import { characterParts, defaultConfig, colorPalettes } from "../config/characterConfig";
import { Card, CardContent } from "./ui/card";
import PartPreview from "./ui/PartPreview";
import CharacterPreview from "./character/CharacterPreview";
import PartSelector from "./character/PartSelector";
import ColorPalette from "./character/ColorPalette";
import Character from "./character/Character"; // Add this import

const CharacterCreator: React.FC = () => {
  const [config, setConfig] = useState<CharacterConfig>({...defaultConfig});
  const [activePart, setActivePart] = useState<CharacterPart>(characterParts[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const characterRef = useRef<HTMLDivElement>(null);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "loadConfig" && event.data.config) {
        try {
          // Start loading state
          setIsLoading(true);
          setLoadingProgress(0);
          
          // Set up progress animation
          let progress = 0;
          loadingTimerRef.current = setInterval(() => {
            progress += 5;
            setLoadingProgress(Math.min(progress, 95)); // Cap at 95% until complete
            
            if (progress >= 100) {
              clearInterval(loadingTimerRef.current as NodeJS.Timeout);
              loadingTimerRef.current = null;
            }
          }, 100);
          
          // Ensure loading stays visible for at least 2 seconds
          setTimeout(() => {
            // Apply the configuration
            setConfig(event.data.config);
            
            // Complete loading after 2 seconds
            setTimeout(() => {
              setLoadingProgress(100);
              setTimeout(() => {
                setIsLoading(false);
                toast.success("Configuración cargada");
              }, 200);
            }, 100);
            
            if (loadingTimerRef.current) {
              clearInterval(loadingTimerRef.current);
              loadingTimerRef.current = null;
            }
          }, 2000);
          
        } catch (error) {
          console.error("Error al cargar la configuración:", error);
          setIsLoading(false);
          toast.error("Error al cargar la configuración");
          
          if (loadingTimerRef.current) {
            clearInterval(loadingTimerRef.current);
            loadingTimerRef.current = null;
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      if (loadingTimerRef.current) {
        clearInterval(loadingTimerRef.current);
      }
    };
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

      // Create a deep clone of the SVG to manipulate
      const clonedSvg = svgElement.cloneNode(true) as SVGElement;
      
      // Apply colors directly to SVG elements with colorable class before export
      Object.keys(config).forEach(partKey => {
        const part = partKey as keyof CharacterConfig;
        const color = config[part].color;
        
        // Find only elements with the colorable class in this part and apply color
        const colorablePaths = clonedSvg.querySelectorAll(`.character-${part} .colorable, .character-${part} path.colorable`);
        colorablePaths.forEach(path => {
          // Apply color directly only to colorable elements
          (path as SVGElement).setAttribute('fill', color);
        });
      });

      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      
      // Create a square canvas with equal width and height
      const size = 300; // Square size
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not create canvas context");

      const img = new Image();
      img.src = URL.createObjectURL(svgBlob);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Fill with white background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Calculate positioning to center the character in the square
      // SVG viewBox is typically 160x160, so we maintain the aspect ratio
      const svgSize = 160;
      const scale = Math.min(size / svgSize, size / svgSize);
      const offsetX = (size - (svgSize * scale)) / 2;
      const offsetY = (size - (svgSize * scale)) / 2;
      
      // Draw SVG centered in the square canvas
      ctx.drawImage(img, offsetX, offsetY, svgSize * scale, svgSize * scale);
      
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
          <Character config={previewConfig} />
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

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {renderPartPreviews()}
              </div>
            </div>

            <button 
              className="save-button py-1.5" 
              onClick={saveCharacter}
              disabled={isLoading}
            >
              <Icon icon="mingcute:save-fill" width="16" />
            </button>
          </div>

          <ColorPalette 
            colors={getCurrentColorPalette()}
            selectedColor={config[activePart.id as keyof CharacterConfig].color}
            onColorChange={handleColorChange}
            isLoading={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCreator;
