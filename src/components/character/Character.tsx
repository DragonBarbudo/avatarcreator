
import React, { useEffect, useRef } from "react";
import { CharacterConfig } from "../../types/character";
import { useAvatarSvg } from "../../hooks/useAvatarSvg";

interface CharacterProps {
  config: CharacterConfig;
}

const Character: React.FC<CharacterProps> = ({ config }) => {
  const { svgContent, isLoading } = useAvatarSvg();
  const svgRef = useRef<HTMLDivElement>(null);

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

    // Hide all elements first
    const allElements = clonedSvg.querySelectorAll('[id^="eyes-"], [id^="fhair-"], [id^="bhair-"], [id^="brows-"], [id^="nose-"], [id^="mouth-"], [id^="face-"], [id^="shirt-"]');
    allElements.forEach(element => {
      (element as SVGElement).style.display = 'none';
    });

    // Show selected elements based on config
    const elementsToShow = [
      `eyes-${config.eyes.style + 1}`,
      `fhair-${config.hair.frontStyle + 1}`,
      `brows-${config.brows.style + 1}`,
      `nose-${config.nose.style + 1}`,
      `mouth-${config.mouth.style + 1}`,
      `face-${config.face.style + 1}`,
      `shirt-${config.shirt.style + 1}`
    ];

    // For back hair, try to match the front hair style first, then fall back to configured back style
    const backHairId = `bhair-${config.hair.frontStyle + 1}`;
    const backHairElement = clonedSvg.querySelector(`#${backHairId}`);
    if (backHairElement) {
      elementsToShow.push(backHairId);
    } else {
      // If no matching back hair, try the configured back style
      const fallbackBackHairId = `bhair-${config.hair.backStyle + 1}`;
      const fallbackBackHairElement = clonedSvg.querySelector(`#${fallbackBackHairId}`);
      if (fallbackBackHairElement) {
        elementsToShow.push(fallbackBackHairId);
      }
    }

    elementsToShow.forEach(elementId => {
      const element = clonedSvg.querySelector(`#${elementId}`);
      if (element) {
        (element as SVGElement).style.display = 'block';
        
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
      }
    });

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

  return <div ref={svgRef} className="character-display" />;
};

export default Character;
