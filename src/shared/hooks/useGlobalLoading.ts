import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

interface GlobalLoadingContextType {
  isLoading: boolean;
  isInitialLoad: boolean;
  registerLoading: (key: string) => void;
  resolveLoading: (key: string) => void;
}

export const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export const useGlobalLoadingProvider = () => {
  const [pendingSources, setPendingSources] = useState<Set<string>>(new Set(["initialization"]));
  const timeoutRef = useRef<number | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setPendingSources((prev) => {
        const newSet = new Set(prev);
        newSet.delete("initialization");
        return newSet;
      });
    }, 0);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


  const registerLoading = useCallback((key: string) => {
    setPendingSources((prev) => new Set(prev).add(key));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setPendingSources(new Set());
    }, 5000);
  }, []);

  const resolveLoading = useCallback((key: string) => {
    setPendingSources((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  }, []);

  const isLoading = pendingSources.size > 0;
  useEffect(() => {
    if (!isLoading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isLoading, isInitialLoad]);

  return { isLoading, registerLoading, resolveLoading, isInitialLoad };
};

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error("useGlobalLoading debe ser usado dentro de GlobalLoadingProvider");
  }
  return context;
};
