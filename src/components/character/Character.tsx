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
    
    // Set proper viewBox and dimensions to fill container
    clonedSvg.setAttribute('viewBox', '0 0 340 341');
    clonedSvg.setAttribute('width', '100%');
    clonedSvg.setAttribute('height', '100%');
    clonedSvg.classList.add('character-svg');

    // Get all possible elements that could be part of the character
    const allPossibleElements = clonedSvg.querySelectorAll('[id*="eyes-"], [id*="fhair-"], [id*="bhair-"], [id*="brows-"], [id*="nose-"], [id*="mouth-"], [id*="face-"], [id*="shirt-"]');
    
    // Hide ALL elements first
    allPossibleElements.forEach(element => {
      (element as SVGElement).style.display = 'none';
    });

    // Show selected elements based on config - but check if they exist first
    const elementsToShow: string[] = [];
    
    // Add elements with proper ID format, but check if they exist in the SVG
    const eyesId = `eyes-${config.eyes.style + 1}`;
    if (clonedSvg.querySelector(`#${eyesId}`)) {
      elementsToShow.push(eyesId);
    }

    const fhairId = `fhair-${config.hair.frontStyle + 1}`;
    if (clonedSvg.querySelector(`#${fhairId}`)) {
      elementsToShow.push(fhairId);
    }

    const browsId = `brows-${config.brows.style + 1}`;
    if (clonedSvg.querySelector(`#${browsId}`)) {
      elementsToShow.push(browsId);
    }

    const noseId = `nose-${config.nose.style + 1}`;
    if (clonedSvg.querySelector(`#${noseId}`)) {
      elementsToShow.push(noseId);
    }

    const mouthId = `mouth-${config.mouth.style + 1}`;
    if (clonedSvg.querySelector(`#${mouthId}`)) {
      elementsToShow.push(mouthId);
    }

    const faceId = `face-${config.face.style + 1}`;
    if (clonedSvg.querySelector(`#${faceId}`)) {
      elementsToShow.push(faceId);
    }

    const shirtId = `shirt-${config.shirt.style + 1}`;
    if (clonedSvg.querySelector(`#${shirtId}`)) {
      elementsToShow.push(shirtId);
    }

    // For back hair, match the front hair style number (not consecutive counter)
    const backHairId = `bhair-${config.hair.frontStyle + 1}`;
    if (clonedSvg.querySelector(`#${backHairId}`)) {
      elementsToShow.push(backHairId);
    }

    console.log('Showing elements:', elementsToShow);

    // Show only the selected elements that exist
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
      <div className="character-svg flex items-center justify-center w-full h-full">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <div ref={svgRef} className="character-display w-full h-full" />;
};

export default Character;
