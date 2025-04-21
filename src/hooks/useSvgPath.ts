
import { useEffect, useState } from 'react';

export const useSvgPath = (style: number, folder: string) => {
  const [pathData, setPathData] = useState<string>('');

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(`/character-brand/${folder}/${folder}${style + 1}.svg`);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const pathElement = svgDoc.querySelector('path');
        if (pathElement) {
          setPathData(pathElement.getAttribute('d') || '');
        }
      } catch (error) {
        console.error(`Error loading ${folder} style ${style}:`, error);
      }
    };

    loadSvg();
  }, [style, folder]);

  return pathData;
};
