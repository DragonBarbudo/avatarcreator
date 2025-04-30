
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
            // Use existing defs section
            defsContent = defs.outerHTML;
          } else {
            // Check for clipPath elements that might be outside a defs section
            const clipPaths = Array.from(svgDoc.querySelectorAll('clipPath'));
            if (clipPaths.length > 0) {
              defsContent = `<defs>${clipPaths.map(cp => cp.outerHTML).join('')}</defs>`;
            }
          }

          // Process main content elements
          let mainContent = '';
          
          // Process all direct children of the SVG element, including paths, groups, etc.
          Array.from(svgElement.children).forEach(child => {
            // Skip defs sections as we've already handled them
            if (child.tagName.toLowerCase() === 'defs') return;
            
            // For path elements, add colorable class if needed
            if (child.tagName.toLowerCase() === 'path') {
              const pathElement = child as SVGPathElement;
              if (!pathElement.getAttribute('class') && pathElement.getAttribute('fill')) {
                pathElement.setAttribute('class', 'colorable');
              }
            }
            
            // For group elements, process their paths too
            if (child.tagName.toLowerCase() === 'g') {
              const paths = Array.from(child.querySelectorAll('path'));
              paths.forEach(path => {
                if (!path.getAttribute('class') && path.getAttribute('fill')) {
                  path.setAttribute('class', 'colorable');
                }
              });
            }
            
            mainContent += child.outerHTML;
          });
          
          // Combine defs and main content
          const finalContent = defsContent + mainContent;
          
          setSvgContent(finalContent.trim());
          console.log(`Loaded ${folder} style ${style}:`, finalContent);
        }
      } catch (error) {
        console.error(`Error loading ${folder} style ${style}:`, error);
      }
    };

    loadSvg();
  }, [style, folder]);

  return svgContent;
};
