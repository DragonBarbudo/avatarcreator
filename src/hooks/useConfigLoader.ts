
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { CharacterConfig } from '../types/character';

export const useConfigLoader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "loadConfig" && event.data.config) {
        try {
          // Start loading state
          setIsLoading(true);
          setLoadingProgress(0);
          
          // Set up progress animation
          let progress = 0;
          loadingTimerRef.current = setInterval(() => {
            progress += 5;
            setLoadingProgress(Math.min(progress, 95)); // Cap at 95% until complete
            
            if (progress >= 100) {
              clearInterval(loadingTimerRef.current as NodeJS.Timeout);
              loadingTimerRef.current = null;
            }
          }, 100);
          
          // Ensure loading stays visible for at least 2 seconds
          setTimeout(() => {
            // Complete loading after 2 seconds
            setTimeout(() => {
              setLoadingProgress(100);
              setTimeout(() => {
                setIsLoading(false);
                toast.success("Configuración cargada");
              }, 200);
            }, 100);
            
            if (loadingTimerRef.current) {
              clearInterval(loadingTimerRef.current);
              loadingTimerRef.current = null;
            }
          }, 2000);
          
          return event.data.config;
        } catch (error) {
          console.error("Error al cargar la configuración:", error);
          setIsLoading(false);
          toast.error("Error al cargar la configuración");
          
          if (loadingTimerRef.current) {
            clearInterval(loadingTimerRef.current);
            loadingTimerRef.current = null;
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      if (loadingTimerRef.current) {
        clearInterval(loadingTimerRef.current);
      }
    };
  }, []);

  return { isLoading, loadingProgress };
};
