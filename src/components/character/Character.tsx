
import React, { useEffect, useRef, useState } from "react";
import { CharacterConfig } from "../../types/character";
import { useAvatarSvg } from "../../hooks/useAvatarSvg";

interface CharacterProps {
  config: CharacterConfig;
}

const Character: React.FC<CharacterProps> = ({ config }) => {
  const { svgContent, isLoading } = useAvatarSvg();
  const svgRef = useRef<HTMLDivElement>(null);
  const [activeElements, setActiveElements] = useState<string[]>([]);

  useEffect(() => {
    if (!svgContent || !svgRef.current) return;

    // Create a temporary container to parse the SVG
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgContent;
    const svgElement = tempDiv.querySelector('svg');
    
    if (!svgElement) return;

    // Clone the SVG to avoid modifying the original
    const clonedSvg = svgElement.cloneNode(true) as SVGElement;
    
    // Set proper viewBox and dimensions
    clonedSvg.setAttribute('viewBox', '0 0 340 341');
    clonedSvg.setAttribute('width', '160');
    clonedSvg.setAttribute('height', '160');
    clonedSvg.classList.add('character-svg');

    // Get all possible elements that could be part of the character
    const allPossibleElements = clonedSvg.querySelectorAll('[id*="eyes-"], [id*="fhair-"], [id*="bhair-"], [id*="brows-"], [id*="nose-"], [id*="mouth-"], [id*="face-"], [id*="shirt-"]');
    
    // Hide ALL elements first
    allPossibleElements.forEach(element => {
      (element as SVGElement).style.display = 'none';
    });

    // Show selected elements based on config
    const elementsToShow: string[] = [];
    
    // Add elements with proper ID format
    elementsToShow.push(`eyes-${config.eyes.style + 1}`);
    elementsToShow.push(`fhair-${config.hair.frontStyle + 1}`);
    elementsToShow.push(`brows-${config.brows.style + 1}`);
    elementsToShow.push(`nose-${config.nose.style + 1}`);
    elementsToShow.push(`mouth-${config.mouth.style + 1}`);
    elementsToShow.push(`face-${config.face.style + 1}`);
    elementsToShow.push(`shirt-${config.shirt.style + 1}`);

    // For back hair, try to match the front hair style
    const backHairId = `bhair-${config.hair.frontStyle + 1}`;
    const backHairElement = clonedSvg.querySelector(`#${backHairId}`);
    if (backHairElement) {
      elementsToShow.push(backHairId);
    }

    console.log('Showing elements:', elementsToShow);

    const actuallyShown: string[] = [];

    // Show only the selected elements
    elementsToShow.forEach(elementId => {
      const element = clonedSvg.querySelector(`#${elementId}`);
      if (element) {
        (element as SVGElement).style.display = 'block';
        actuallyShown.push(elementId);
        
        // Apply colors to colorable elements
        const partType = elementId.split('-')[0];
        let color = '';
        
        switch (partType) {
          case 'eyes':
            color = config.eyes.color;
            break;
          case 'fhair':
          case 'bhair':
            color = config.hair.color;
            break;
          case 'brows':
            color = config.brows.color;
            break;
          case 'nose':
            color = config.nose.color;
            break;
          case 'mouth':
            color = config.mouth.color;
            break;
          case 'face':
            color = config.face.color;
            break;
          case 'shirt':
            color = config.shirt.color;
            break;
        }
        
        // Apply color to colorable paths within the element
        const colorablePaths = element.querySelectorAll('.colorable, path.colorable');
        colorablePaths.forEach(path => {
          (path as SVGElement).setAttribute('fill', color);
        });
      } else {
        console.log('Element not found:', elementId);
      }
    });

    // Update the active elements state for debugging
    setActiveElements(actuallyShown);

    // Clear previous content and add new SVG
    svgRef.current.innerHTML = '';
    svgRef.current.appendChild(clonedSvg);
  }, [svgContent, config]);

  if (isLoading) {
    return (
      <div className="character-svg flex items-center justify-center" style={{ width: '160px', height: '160px' }}>
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div ref={svgRef} className="character-display" />
      <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
        <div className="font-semibold mb-1">Active Elements:</div>
        <div className="space-y-1">
          {activeElements.length > 0 ? (
            activeElements.map((element, index) => (
              <div key={index} className="text-gray-700">{element}</div>
            ))
          ) : (
            <div className="text-gray-500">No active elements found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Character;
