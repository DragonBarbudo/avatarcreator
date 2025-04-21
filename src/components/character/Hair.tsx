
import React, { useEffect, useState } from "react";

interface HairProps {
  style: number;
  color: string;
}

const Hair: React.FC<HairProps> = ({ style, color }) => {
  const [svgPath, setSvgPath] = useState<string>("");
  const [viewBox, setViewBox] = useState<string>("0 0 100 100");
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
        
        // Extract viewBox if available
        const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/);
        
        if (pathMatch && pathMatch[1]) {
          setSvgPath(pathMatch[1]);
          
          if (viewBoxMatch && viewBoxMatch[1]) {
            setViewBox(viewBoxMatch[1]);
          }
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

  // Transform the path data to fit within the character's viewBox (100x150)
  return (
    <g transform="scale(0.5)">
      <path d={svgPath} fill={color} transform="translate(0, 20)" />
    </g>
  );
};

export default Hair;
