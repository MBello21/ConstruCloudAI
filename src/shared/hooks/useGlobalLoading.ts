import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

interface GlobalLoadingContextType {
  isLoading: boolean;
  registerLoading: (key: string) => void;
  resolveLoading: (key: string) => void;
}

export const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

export const useGlobalLoadingProvider = () => {
  const [pendingSources, setPendingSources] = useState<Set<string>>(new Set(["initialization"]));
  const timeoutRef = useRef<number | null>(null);

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

  return { isLoading, registerLoading, resolveLoading };
};

export const useGlobalLoading = () => {
  const context = useContext(GlobalLoadingContext);
  if (!context) {
    throw new Error("useGlobalLoading debe ser usado dentro de GlobalLoadingProvider");
  }
  return context;
};
