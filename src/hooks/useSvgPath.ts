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
          // Keep the viewBox attribute for proper scaling
          const viewBox = svgElement.getAttribute('viewBox');
          
          // Extract defs for clip paths, gradients, etc.
          const defs = svgElement.querySelector('defs');
          
          // Extract the main content
          let innerContent = svgElement.innerHTML;
          
          // If there's no explicit defs but we have clip paths or other references,
          // we need to make sure they're preserved
          if (!defs && innerContent.includes('clip-path') && !innerContent.includes('<defs>')) {
            // Get all clip path elements
            const clipPaths = Array.from(svgDoc.querySelectorAll('clipPath'));
            
            if (clipPaths.length > 0) {
              // Create a defs element if it doesn't exist
              const defsContent = `<defs>${clipPaths.map(cp => cp.outerHTML).join('')}</defs>`;
              innerContent = defsContent + innerContent;
            }
          }
          
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
