
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
          
          // Get the main content (excluding defs)
          const mainContent = Array.from(svgElement.childNodes)
            .filter(node => node.nodeName !== 'defs')
            .map(node => node.nodeType === Node.ELEMENT_NODE ? (node as Element).outerHTML : node.textContent)
            .join('');
          
          // If we have clip paths but they're not in a defs element, create a defs section
          let defsContent = '';
          if (clipPaths.length > 0 && !defs) {
            defsContent = `<defs>${clipPaths.map(cp => cp.outerHTML).join('')}</defs>`;
          } else if (defs) {
            defsContent = defs.outerHTML;
          }
          
          // Ensure all elements retain their class attributes, especially for colorable elements
          let processedContent = mainContent;
          const classElements = Array.from(svgElement.querySelectorAll('[class]'));
          classElements.forEach(el => {
            const className = el.getAttribute('class');
            if (className && !processedContent.includes(`class="${className}"`)) {
              const elOuterHTML = el.outerHTML;
              const elTag = el.tagName.toLowerCase();
              const elId = el.getAttribute('id') || '';
              
              // Pattern to find the element in the content (simplified)
              const elPattern = new RegExp(`<${elTag}[^>]*?(id="${elId}")?[^>]*?>`, 'g');
              processedContent = processedContent.replace(elPattern, (match) => {
                if (!match.includes(`class="${className}"`)) {
                  return match.replace(/(<${elTag})([^>]*)(>)/, `$1 class="${className}"$2$3`);
                }
                return match;
              });
            }
          });
          
          // Combine defs and processed content
          setSvgContent((defsContent + processedContent).trim());
        }
      } catch (error) {
        console.error(`Error loading ${folder} style ${style}:`, error);
      }
    };

    loadSvg();
  }, [style, folder]);

  return svgContent;
};
