
import React, { useEffect, useRef, useState } from "react";
import { CharacterConfig } from "../../types/character";
import { useAvatarSvg } from "../../hooks/useAvatarSvg";

interface CharacterProps {
  config: CharacterConfig;
  onElementsDiscovered?: (elements: {[key: string]: string[]}) => void;
}

const Character: React.FC<CharacterProps> = ({ config, onElementsDiscovered }) => {
  const { svgContent, isLoading } = useAvatarSvg();
  const svgRef = useRef<HTMLDivElement>(null);
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const [availableElements, setAvailableElements] = useState<{[key: string]: string[]}>({});

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

    // Discover available elements by category
    const discovered: {[key: string]: string[]} = {
      eyes: [],
      fhair: [],
      bhair: [],
      brows: [],
      nose: [],
      mouth: [],
      face: [],
      shirt: []
    };

    // Find all elements with IDs matching our patterns
    const allElements = clonedSvg.querySelectorAll('[id]');
    allElements.forEach(element => {
      const id = element.id;
      if (id.startsWith('eyes-')) discovered.eyes.push(id);
      else if (id.startsWith('fhair-')) discovered.fhair.push(id);
      else if (id.startsWith('bhair-')) discovered.bhair.push(id);
      else if (id.startsWith('brows-')) discovered.brows.push(id);
      else if (id.startsWith('nose-')) discovered.nose.push(id);
      else if (id.startsWith('mouth-')) discovered.mouth.push(id);
      else if (id.startsWith('face-')) discovered.face.push(id);
      else if (id.startsWith('shirt-')) discovered.shirt.push(id);
    });

    // Sort arrays to ensure consistent ordering
    Object.keys(discovered).forEach(key => {
      discovered[key].sort((a, b) => {
        const numA = parseInt(a.split('-')[1]);
        const numB = parseInt(b.split('-')[1]);
        return numA - numB;
      });
    });

    setAvailableElements(discovered);
    
    // Call the callback to inform parent about discovered elements
    if (onElementsDiscovered) {
      onElementsDiscovered(discovered);
    }

    console.log('Discovered available elements:', discovered);

    // Hide ALL elements first
    allElements.forEach(element => {
      (element as SVGElement).style.display = 'none';
    });

    // Show selected elements based on config - using discovered elements array
    const elementsToShow: string[] = [];

    // Map config indices to actual available elements
    if (discovered.eyes[config.eyes.style]) {
      elementsToShow.push(discovered.eyes[config.eyes.style]);
    }
    
    if (discovered.fhair[config.hair.frontStyle]) {
      elementsToShow.push(discovered.fhair[config.hair.frontStyle]);
    }
    
    // For back hair, try to match the front hair style if available
    if (discovered.bhair[config.hair.frontStyle]) {
      elementsToShow.push(discovered.bhair[config.hair.frontStyle]);
    }
    
    if (discovered.brows[config.brows.style]) {
      elementsToShow.push(discovered.brows[config.brows.style]);
    }
    
    if (discovered.nose[config.nose.style]) {
      elementsToShow.push(discovered.nose[config.nose.style]);
    }
    
    if (discovered.mouth[config.mouth.style]) {
      elementsToShow.push(discovered.mouth[config.mouth.style]);
    }
    
    if (discovered.face[config.face.style]) {
      elementsToShow.push(discovered.face[config.face.style]);
    }
    
    if (discovered.shirt[config.shirt.style]) {
      elementsToShow.push(discovered.shirt[config.shirt.style]);
    }

    console.log('Showing elements:', elementsToShow);
    const actuallyShown: string[] = [];

    // Show only the selected elements
    elementsToShow.forEach(elementId => {
      const element = clonedSvg.querySelector(`#${elementId}`);
      if (element) {
        // For SVG elements, remove the display style entirely or set to inline
        (element as SVGElement).style.display = '';
        (element as SVGElement).style.visibility = 'visible';
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
  }, [svgContent, config, onElementsDiscovered]);

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
    </div>
  );
};

export default Character;
