
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

          // Process main content elements - preserve all paths and their original attributes
          let mainContent = '';
          
          // Process all direct children of the SVG element
          Array.from(svgElement.children).forEach(child => {
            // Skip defs sections as we've already handled them
            if (child.tagName.toLowerCase() === 'defs') return;
            
            // For individual path elements at the top level
            if (child.tagName.toLowerCase() === 'path') {
              const pathElement = child as SVGPathElement;
              if (!pathElement.getAttribute('class') && pathElement.getAttribute('fill')) {
                // Only add colorable class if it's not explicitly white/transparent or named color
                const fill = pathElement.getAttribute('fill')?.toLowerCase();
                if (fill && fill !== '#ffffff' && fill !== '#fff' && fill !== 'white' && 
                    fill !== 'none' && fill !== 'transparent' && !fill.includes('url(')) {
                  pathElement.setAttribute('class', 'colorable');
                }
              }
            }
            
            // For group elements, selectively add colorable class to paths
            if (child.tagName.toLowerCase() === 'g') {
              const paths = Array.from(child.querySelectorAll('path'));
              paths.forEach(path => {
                if (!path.getAttribute('class')) {
                  const fill = path.getAttribute('fill')?.toLowerCase();
                  // Only colorize paths with fill that aren't white/transparent
                  if (fill && fill !== '#ffffff' && fill !== '#fff' && fill !== 'white' && 
                      fill !== 'none' && fill !== 'transparent' && !fill.includes('url(')) {
                    path.setAttribute('class', 'colorable');
                  }
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
