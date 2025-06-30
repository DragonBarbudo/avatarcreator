
import { useEffect, useState } from 'react';

export const useAvatarSvg = () => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.BASE_URL}avatar.svg`);
        if (!response.ok) {
          console.error(`Failed to load avatar.svg: ${response.status}`);
          return;
        }
        
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Error loading avatar.svg:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSvg();
  }, []);

  return { svgContent, isLoading };
};
