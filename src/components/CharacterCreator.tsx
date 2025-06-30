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
import Character from "./character/Character";
const CharacterCreator: React.FC = () => {
  const [config, setConfig] = useState<CharacterConfig>({
    ...defaultConfig
  });
  const [activePart, setActivePart] = useState<CharacterPart>(characterParts[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [availableElements, setAvailableElements] = useState<{[key: string]: string[]}>({});
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
    if (activePart.id === 'hair') {
      // For hair, update front style and automatically sync back style
      setConfig({
        ...config,
        hair: {
          ...config.hair,
          frontStyle: newStyle,
          backStyle: newStyle // Automatically match back hair to front hair
        }
      });
    } else {
      setConfig({
        ...config,
        [activePart.id]: {
          ...config[activePart.id as keyof CharacterConfig],
          style: newStyle
        }
      });
    }
  };
  const handleColorChange = (newColor: string) => {
    setConfig({
      ...config,
      [activePart.id]: {
        ...config[activePart.id as keyof CharacterConfig],
        color: newColor
      }
    });
  };
  const saveCharacter = async () => {
    if (!characterRef.current) return;
    try {
      const svgElement = characterRef.current.querySelector("svg");
      if (!svgElement) throw new Error("SVG element not found");
      const clonedSvg = svgElement.cloneNode(true) as SVGElement;
      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8"
      });
      const size = 300;
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
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const svgSize = 160;
      const scale = Math.min(size / svgSize, size / svgSize);
      const offsetX = (size - svgSize * scale) / 2;
      const offsetY = (size - svgSize * scale) / 2;
      ctx.drawImage(img, offsetX, offsetY, svgSize * scale, svgSize * scale);
      const pngDataUrl = canvas.toDataURL("image/png");
      const payload: PostMessagePayload = {
        type: "save",
        config,
        imageData: pngDataUrl
      };
      window.parent.postMessage(payload, "*");
      toast.success("¡Avatar actualizado!");
    } catch (error) {
      console.error("Error saving character:", error);
      toast.error("Error al guardar avatar. Intenta de nuevo.");
    }
  };
  const renderPartPreviews = () => {
    const currentPart = activePart;
    const previews = [];
    
    // Get available elements for current part
    const availableForPart = availableElements[currentPart.id === 'hair' ? 'fhair' : currentPart.id] || [];
    const maxOptions = availableForPart.length;
    
    // Use the actual number of available elements instead of hardcoded count
    for (let i = 0; i < maxOptions; i++) {
      let previewConfig;
      if (currentPart.id === 'hair') {
        previewConfig = {
          ...config,
          hair: {
            ...config.hair,
            frontStyle: i,
            backStyle: i // Automatically match back hair
          }
        };
      } else {
        previewConfig = {
          ...config,
          [currentPart.id]: {
            ...config[currentPart.id as keyof CharacterConfig],
            style: i
          }
        };
      }

      // Get current style value properly for comparison
      const currentPartConfig = config[currentPart.id as keyof CharacterConfig];
      let currentStyle = 0;
      if (currentPart.id === 'hair') {
        currentStyle = config.hair.frontStyle;
      } else if ('style' in currentPartConfig) {
        currentStyle = currentPartConfig.style;
      }
      
      previews.push(
        <PartPreview 
          key={i} 
          label={`Style ${i + 1}`} 
          style={i} 
          color={currentPartConfig.color} 
          isSelected={currentStyle === i} 
          onClick={() => handleStyleChange(i)}
        >
          <Character 
            config={previewConfig} 
            onElementsDiscovered={setAvailableElements}
          />
        </PartPreview>
      );
    }
    return (
      <div className="grid grid-cols-4 gap-0.5">
        {previews}
      </div>
    );
  };
  const getCurrentColorPalette = () => {
    return colorPalettes[activePart.id] || [];
  };
  return (
    <Card className="character-creator w-[380px] h-[800px] h-full overflow-hidden relative">
      <CardContent className="flex flex-col h-full p-2 gap-2">
        <div className="character-display bg-secondary/30 rounded-lg p-2 relative" ref={characterRef}>
          <CharacterPreview config={config} isLoading={isLoading} loadingProgress={loadingProgress} />
        </div>

        <div className="flex-1 flex gap-2 min-h-0">
          <div className="flex-1 flex flex-col gap-2 overflow-hidden">
            <PartSelector characterParts={characterParts} activePart={activePart} setActivePart={setActivePart} isLoading={isLoading} />
            
            <ColorPalette colors={getCurrentColorPalette()} selectedColor={config[activePart.id as keyof CharacterConfig].color} onColorChange={handleColorChange} isLoading={isLoading} />

            <div className="flex-1 overflow-y-auto">
              {renderPartPreviews()}
            </div>

            <button onClick={saveCharacter} disabled={isLoading} className="absolute top-2 right-2 save-button">
              <Icon icon="mingcute:check-2-fill" width="16" />
              <span className="text-xs">Guardar</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CharacterCreator;
