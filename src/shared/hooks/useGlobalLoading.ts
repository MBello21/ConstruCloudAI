import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

interface GlobalLoadingContextType {
  isLoading: boolean;
  registerLoading: (key: string) => void;
  resolveLoading: (key: string) => void;
}

export const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export const useGlobalLoadingProvider = () => {
  const [pendingSources, setPendingSources] = useState<Set<string>>(new Set());
  const timeoutRef = useRef<number | null>(null);

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
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isLoading, registerLoading, resolveLoading };
};

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error("useGlobalLoading debe ser usado dentro de GlobalLoadingProvider");
  }
  return context;
};
