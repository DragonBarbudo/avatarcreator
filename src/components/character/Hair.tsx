
import React, { useEffect, useState } from "react";

interface HairProps {
  style: number;
  color: string;
}

const Hair: React.FC<HairProps> = ({ style, color }) => {
  const [svgPath, setSvgPath] = useState<string>("");
  const totalHairStyles = 9;

  useEffect(() => {
    const loadHairSVG = async () => {
      try {
        // Adjust style number to match file naming (1-9)
        const styleNumber = ((style % totalHairStyles) + 1);
        const response = await fetch(`/character-brand/hair/hair${styleNumber}.svg`);
        const svgText = await response.text();
        
        // Extract the path data using regex
        const pathMatch = svgText.match(/<path\s+d="([^"]+)"/);
        if (pathMatch && pathMatch[1]) {
          setSvgPath(pathMatch[1]);
        }
      } catch (error) {
        console.error("Error loading hair SVG:", error);
      }
    };

    loadHairSVG();
  }, [style]);

  if (!svgPath) {
    return null;
  }

  return <path d={svgPath} fill={color} />;
};

export default Hair;
