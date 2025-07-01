
import { useRef } from 'react';
import { toast } from 'sonner';
import { CharacterConfig, PostMessagePayload } from '../types/character';

export const useSaveCharacter = () => {
  const characterRef = useRef<HTMLDivElement>(null);

  const saveCharacter = async (config: CharacterConfig) => {
    if (!characterRef.current) return;

    try {
      const svgElement = characterRef.current.querySelector("svg");
      if (!svgElement) throw new Error("SVG element not found");

      const clonedSvg = svgElement.cloneNode(true) as SVGElement;
      
      const svgData = new XMLSerializer().serializeToString(clonedSvg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      
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
      const offsetX = (size - (svgSize * scale)) / 2;
      const offsetY = (size - (svgSize * scale)) / 2;
      
      ctx.drawImage(img, offsetX, offsetY, svgSize * scale, svgSize * scale);
      
      const pngDataUrl = canvas.toDataURL("image/png");
      
      const payload: PostMessagePayload = {
        type: "save",
        config,
        imageData: pngDataUrl,
      };
      
      window.parent.postMessage(payload, "*");
      toast.success("¡Avatar actualizado!");
    } catch (error) {
      console.error("Error saving character:", error);
      toast.error("Error al guardar avatar. Intenta de nuevo.");
    }
  };

  return { saveCharacter, characterRef };
};
