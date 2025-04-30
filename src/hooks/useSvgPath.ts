
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
          
          // Get all content from the SVG
          const allContent = svgElement.innerHTML;
          
          // If we have clip paths but they're not in a defs element, create a defs section
          let defsContent = '';
          if (clipPaths.length > 0 && !defs) {
            defsContent = `<defs>${clipPaths.map(cp => cp.outerHTML).join('')}</defs>`;
          } else if (defs) {
            defsContent = defs.outerHTML;
          }

          // Handle paths with class attributes
          let mainContent = allContent;
          if (!defs) {
            // If we extracted defs content, we need to remove it from the main content
            mainContent = mainContent.replace(/<defs>.*?<\/defs>/s, '');
          }
          
          // Find all elements with class attribute and ensure they're preserved
          const classElements = Array.from(svgElement.querySelectorAll('[class]'));
          classElements.forEach(el => {
            const className = el.getAttribute('class');
            if (className) {
              const elTag = el.tagName.toLowerCase();
              const elId = el.getAttribute('id') || '';
              const elOuterHTML = el.outerHTML;
              
              // Make sure the class is properly applied
              if (elId && !mainContent.includes(`class="${className}"`)) {
                mainContent = mainContent.replace(
                  new RegExp(`<${elTag}[^>]*?(id="${elId}").*?>`, 'g'),
                  match => match.includes(`class="${className}"`) ? match : match.replace(/(<${elTag}[^>]*?)>/, `$1 class="${className}">`)
                );
              }
            }
          });
          
          // Make paths colorable if they don't have a class
          if (folder === 'mouth') {
            const paths = Array.from(svgElement.querySelectorAll('path'));
            paths.forEach(path => {
              const className = path.getAttribute('class');
              if (!className && path.getAttribute('fill')) {
                const pathOuterHTML = path.outerHTML;
                mainContent = mainContent.replace(
                  pathOuterHTML,
                  pathOuterHTML.replace('<path', '<path class="colorable"')
                );
              }
            });
          }

          // Set final content with defs followed by processed content
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
