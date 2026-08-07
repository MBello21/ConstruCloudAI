import { GlobalLoadingContext, useGlobalLoadingProvider } from "../hooks/useGlobalLoading";

export const GlobalLoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useGlobalLoadingProvider();

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
    </GlobalLoadingContext.Provider>
  );
};
