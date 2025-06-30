
import { useEffect, useState } from 'react';

interface SvgExistenceCache {
  [key: string]: boolean;
}

const svgCache: SvgExistenceCache = {};

export const useSvgExistence = (partId: string, totalOptions: number) => {
  const [existingStyles, setExistingStyles] = useState<{[key: string]: boolean}>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkExistingStyles = async () => {
      setIsLoading(true);
      const styleChecks: {[key: string]: boolean} = {};
      
      // Check cache first
      const cacheKey = `${partId}-checked`;
      if (svgCache[cacheKey]) {
        // Load from cache
        for (let i = 0; i < totalOptions; i++) {
          const styleKey = `${partId}-${i + 1}`;
          styleChecks[styleKey] = svgCache[styleKey] || false;
        }
        setExistingStyles(styleChecks);
        setIsLoading(false);
        return;
      }

      // Batch check with Promise.allSettled for better performance
      const promises = Array.from({ length: totalOptions }, (_, i) => {
        const styleId = i + 1;
        const styleKey = `${partId}-${styleId}`;
        
        // Return from cache if available
        if (svgCache[styleKey] !== undefined) {
          return Promise.resolve({ styleKey, exists: svgCache[styleKey] });
        }
        
        return fetch(`${import.meta.env.BASE_URL}character-brand/${partId}/${partId}${styleId}.svg`, { method: 'HEAD' })
          .then(response => ({ styleKey, exists: response.ok }))
          .catch(() => ({ styleKey, exists: false }));
      });

      try {
        const results = await Promise.allSettled(promises);
        
        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            const { styleKey, exists } = result.value;
            styleChecks[styleKey] = exists;
            svgCache[styleKey] = exists; // Cache the result
          }
        });
        
        // Mark this part as checked in cache
        svgCache[cacheKey] = true;
        
        setExistingStyles(styleChecks);
      } catch (error) {
        console.error(`Error checking SVG existence for ${partId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingStyles();
  }, [partId, totalOptions]);

  return { existingStyles, isLoading };
};
