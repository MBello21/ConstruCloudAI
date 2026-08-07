import { useEffect, useRef, useState } from "react";
import { useGlobalLoading } from "./useGlobalLoading";

/**
 * Hook que rastrrea si la aplicación está en su carga inicial.
 * Retorna true solo en la carga inicial (primera vez que globalIsLoading pasa a false).
 * Ignora cambios posteriores de globalIsLoading en navegaciones internas.
 */
export const useInitialLoading = () => {
  const { isLoading: globalIsLoading } = useGlobalLoading();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const hasResolvedOnceRef = useRef(false);

  useEffect(() => {
    if (!globalIsLoading && !hasResolvedOnceRef.current) {
      hasResolvedOnceRef.current = true;
      setIsInitialLoad(false);
    }
  }, [globalIsLoading]);

  return isInitialLoad;
};
