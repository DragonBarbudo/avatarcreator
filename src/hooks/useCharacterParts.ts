
import { useState, useEffect } from 'react';
import { CharacterPart } from '../types/character';

const useCharacterParts = () => {
  const [characterParts, setCharacterParts] = useState<CharacterPart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSvgAndParse = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}avatar.svg`);
        const svgText = await response.text();
        
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        
        const partCounts: { [key: string]: number } = {};
        const partIds = ["eyes", "brows", "nose", "mouth", "face", "shirt"];

        partIds.forEach(partId => {
          const elements = svgDoc.querySelectorAll(`[id^=${partId}-]`);
          partCounts[partId] = elements.length;
        });

        const hairFrontElements = svgDoc.querySelectorAll(`[id^=fhair-]`);
        partCounts["hair"] = hairFrontElements.length;

        const newCharacterParts: CharacterPart[] = [
          { id: "eyes", label: "Eyes", options: partCounts.eyes || 0, defaultColor: "#2F284C" },
          { id: "hair", label: "Hair", options: partCounts.hair || 0, defaultColor: "#482B79" },
          { id: "brows", label: "Eyebrows", options: partCounts.brows || 0, defaultColor: "#3A366F" },
          { id: "nose", label: "Nose", options: partCounts.nose || 0, defaultColor: "#D49677" },
          { id: "mouth", label: "Mouth", options: partCounts.mouth || 0, defaultColor: "#8B4B7A" },
          { id: "face", label: "Face", options: partCounts.face || 0, defaultColor: "#FADFC9" },
          { id: "shirt", label: "Shirt", options: partCounts.shirt || 0, defaultColor: "#342059" }
        ];

        setCharacterParts(newCharacterParts);
      } catch (error) {
        console.error("Error fetching or parsing SVG:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSvgAndParse();
  }, []);

  return { characterParts, loading };
};

export default useCharacterParts;
