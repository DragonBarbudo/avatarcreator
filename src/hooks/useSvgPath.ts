
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
          // Extract all clip paths and defs from the document
          const clipPaths = Array.from(svgDoc.querySelectorAll('clipPath'));
          const defs = svgDoc.querySelector('defs');
          
          // Get all direct paths that are not in any group
          const directPaths = Array.from(svgElement.querySelectorAll(':scope > path'));
          
          // Create defs section if needed
          let defsContent = '';
          if (clipPaths.length > 0) {
            if (!defs) {
              defsContent = `<defs>${clipPaths.map(cp => cp.outerHTML).join('')}</defs>`;
            } else {
              defsContent = defs.outerHTML;
            }
          }

          // Create a new content to build our SVG
          let newContent = defsContent;

          // Handle direct paths (not in groups) - wrap them in a group
          if (directPaths.length > 0 && folder === 'mouth') {
            const pathsContent = directPaths.map(path => {
              let pathHTML = path.outerHTML;
              // Add colorable class to path if it has a fill and no class
              if (!path.hasAttribute('class') && path.hasAttribute('fill')) {
                pathHTML = pathHTML.replace('<path', '<path class="colorable"');
              }
              return pathHTML;
            }).join('');
            
            // Wrap direct paths in a group
            newContent += pathsContent;
          }

          // Handle existing groups
          const groups = Array.from(svgElement.querySelectorAll('g'));
          
          if (groups.length > 0) {
            groups.forEach(group => {
              // Skip groups that are inside defs
              const parentNode = group.parentNode;
              if (parentNode && parentNode.nodeName.toLowerCase() === 'defs') {
                return;
              }
              
              // Make paths in the group colorable if needed
              const paths = Array.from(group.querySelectorAll('path'));
              paths.forEach(path => {
                if (!path.hasAttribute('class') && path.hasAttribute('fill')) {
                  path.setAttribute('class', 'colorable');
                }
              });
              
              newContent += group.outerHTML;
            });
          } else if (directPaths.length === 0) {
            // If no groups and no direct paths, just use the inner content
            const allContent = svgElement.innerHTML;
            
            // Remove defs from inner content if we already processed them
            let mainContent = allContent;
            if (defs) {
              mainContent = mainContent.replace(defs.outerHTML, '');
            }
            
            newContent += mainContent;
          }
          
          // Set the final content
          setSvgContent(newContent.trim());
          console.log(`Loaded ${folder} style ${style}:`, newContent);
        }
      } catch (error) {
        console.error(`Error loading ${folder} style ${style}:`, error);
      }
    };

    loadSvg();
  }, [style, folder]);

  return svgContent;
};
