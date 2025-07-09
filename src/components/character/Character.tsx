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

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgContent;
    const svgElement = tempDiv.querySelector('svg');
    
    if (!svgElement) return;

    const clonedSvg = svgElement.cloneNode(true) as SVGElement;
    
    clonedSvg.setAttribute('viewBox', '0 0 340 341');
    clonedSvg.setAttribute('width', '100%');
    clonedSvg.setAttribute('height', '100%');
    clonedSvg.classList.add('character-svg');

    // 1. Add CSS classes to elements that should be colorable, based on their original fill.
    const allPaths = clonedSvg.querySelectorAll('path, g');
    allPaths.forEach(element => {
      const fill = element.getAttribute('fill');
      if (fill === '#31A4C3') { // Original hair color in SVG
        element.classList.add('fill-hair');
      } else if (fill === '#FBC59D') { // Original face color in SVG
        element.classList.add('fill-face');
      } else if (fill === '#8E45A5') { // Original shirt color in SVG
        element.classList.add('fill-shirt');
      }
    });

    // 2. Create a single style block to control the colors of the classes.
    // This ensures ONLY the fill of these specific classes is changed.
    const style = document.createElement('style');
    style.textContent = `
      .fill-hair { fill: ${config.hair.color}; }
      .fill-face { fill: ${config.face.color}; }
      .fill-shirt { fill: ${config.shirt.color}; }
    `;
    clonedSvg.appendChild(style);

    // 3. Hide all possible parts first.
    const allPossibleElements = clonedSvg.querySelectorAll('[id*="eyes-"], [id*="fhair-"], [id*="bhair-"], [id*="brows-"], [id*="nose-"], [id*="mouth-"], [id*="face-"], [id*="shirt-"]');
    allPossibleElements.forEach(element => {
      (element as SVGElement).style.display = 'none';
    });

    // 4. Create a list of elements to make visible based on config.
    const elementsToShow = [
      `eyes-${config.eyes.style + 1}`,
      `fhair-${config.hair.frontStyle + 1}`,
      `brows-${config.brows.style + 1}`,
      `nose-${config.nose.style + 1}`,
      `mouth-${config.mouth.style + 1}`,
      `face-${config.face.style + 1}`,
      `shirt-${config.shirt.style + 1}`,
      `bhair-${config.hair.frontStyle + 1}` // Match back hair to front hair
    ];

    // 5. Show only the elements that exist in the SVG. No color logic here.
    elementsToShow.forEach(elementId => {
        const element = clonedSvg.querySelector(`#${elementId}`);
        if (element) {
          (element as SVGElement).style.display = 'block';
          if (elementId.startsWith('eyes-')) {
            element.classList.add('blink-animation');
          } else if (elementId.startsWith('brows-')) {
            element.classList.add('eyebrow-animation');
          }
          console.log(`Showing element: ${elementId}`);
        } else {
          console.log(`Element not found: ${elementId}`);
        }
      });

    // 6. Clear previous content and render the updated SVG.
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
