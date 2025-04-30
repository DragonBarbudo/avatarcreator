
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
          // Get all defs and clip paths
          const defs = svgDoc.querySelector('defs');
          
          // First handle any existing defs section
          let defsContent = '';
          if (defs) {
            defsContent = defs.outerHTML;
          } else {
            // Check if there are clip paths outside of defs
            const clipPaths = Array.from(svgDoc.querySelectorAll('clipPath'));
            if (clipPaths.length > 0) {
              defsContent = `<defs>${clipPaths.map(cp => cp.outerHTML).join('')}</defs>`;
            }
          }

          // Now handle the rest of the content
          let mainContent = '';
          
          // Handle groups
          const groups = Array.from(svgElement.querySelectorAll('g'));
          if (groups.length > 0) {
            groups.forEach(group => {
              // Skip groups inside defs
              const parentNode = group.parentNode;
              if (parentNode && parentNode.nodeName.toLowerCase() === 'defs') {
                return;
              }
              
              // Add colorable class to paths if needed
              const paths = Array.from(group.querySelectorAll('path'));
              paths.forEach(path => {
                if (!path.hasAttribute('class') && path.hasAttribute('fill')) {
                  path.setAttribute('class', 'colorable');
                }
              });
              
              mainContent += group.outerHTML;
            });
          } 
          
          // Handle direct paths (not in groups)
          const directPaths = Array.from(svgElement.querySelectorAll(':scope > path'));
          if (directPaths.length > 0) {
            directPaths.forEach(path => {
              let pathHTML = path.outerHTML;
              // Add colorable class to path if it has a fill and no class
              if (!path.hasAttribute('class') && path.hasAttribute('fill')) {
                pathHTML = pathHTML.replace('<path', '<path class="colorable"');
              }
              mainContent += pathHTML;
            });
          }
          
          // If no groups and no direct paths, try to get all inner content
          if (groups.length === 0 && directPaths.length === 0) {
            let innerContent = svgElement.innerHTML;
            
            // Remove defs section from inner content if we already processed it
            if (defs) {
              innerContent = innerContent.replace(defs.outerHTML, '');
            }
            
            // Add colorable class to any paths in the inner content if needed
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = innerContent;
            const innerPaths = Array.from(tempDiv.querySelectorAll('path'));
            innerPaths.forEach(path => {
              if (!path.hasAttribute('class') && path.hasAttribute('fill')) {
                path.setAttribute('class', 'colorable');
              }
            });
            
            mainContent = tempDiv.innerHTML;
          }
          
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
