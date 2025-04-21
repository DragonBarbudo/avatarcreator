
import { useEffect, useState } from 'react';

export const useSvgPath = (style: number, folder: string) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/character-brand/${folder}/${folder}${style + 1}.svg`);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          // Extract all clip paths from the document
          const clipPaths = Array.from(svgDoc.querySelectorAll('clipPath'));
          
          // Get the main content
          let innerContent = svgElement.innerHTML;
          
          // If we have clip paths but they're not in a defs element, add them
          if (clipPaths.length > 0 && !innerContent.includes('<defs>')) {
            const defsContent = `<defs>${clipPaths.map(cp => cp.outerHTML).join('')}</defs>`;
            // Check if the clipPaths are not already in the innerContent
            if (!clipPaths.every(cp => innerContent.includes(cp.outerHTML))) {
              innerContent = defsContent + innerContent;
            }
          }
          
          // Make sure all g elements retain their attributes
          const gElements = Array.from(svgElement.querySelectorAll('g'));
          gElements.forEach(g => {
            const clipPath = g.getAttribute('clip-path');
            if (clipPath) {
              // Ensure clip-path attributes are preserved
              const gId = g.getAttribute('id') || '';
              const gHtml = g.outerHTML;
              const gInnerHtml = g.innerHTML;
              
              // Replace the g element in innerContent with proper clip-path attribute
              innerContent = innerContent.replace(
                new RegExp(`<g[^>]*id="${gId}"[^>]*>.*?</g>`, 's'), 
                gHtml
              );
            }
          });
          
          setSvgContent(innerContent.trim());
        }
      } catch (error) {
        console.error(`Error loading ${folder} style ${style}:`, error);
      }
    };

    loadSvg();
  }, [style, folder]);

  return svgContent;
};
