
import { useEffect, useState } from 'react';

export const useSvgPath = (style: number, folder: string) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/character-brand/${folder}/${folder}${style + 1}.svg`);
        if (!response.ok) {
          console.error(`Failed to load ${folder}${style + 1}.svg: ${response.status}`);
          return;
        }
        
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');
        
        if (svgElement) {
          // Extract defs and clip paths first
          let defsContent = '';
          const defs = svgDoc.querySelector('defs');
          
          if (defs) {
            defsContent = defs.outerHTML;
          } else {
            const clipPaths = Array.from(svgDoc.querySelectorAll('clipPath'));
            if (clipPaths.length > 0) {
              defsContent = `<defs>${clipPaths.map(cp => cp.outerHTML).join('')}</defs>`;
            }
          }

          // Process main content elements
          let mainContent = '';
          
          Array.from(svgElement.children).forEach(child => {
            if (child.tagName.toLowerCase() === 'defs') return;
            mainContent += child.outerHTML;
          });
          
          setSvgContent((defsContent + mainContent).trim());
        }
      } catch (error) {
        console.error(`Error loading ${folder} style ${style}:`, error);
      }
    };

    loadSvg();
  }, [style, folder]);

  return svgContent;
};
