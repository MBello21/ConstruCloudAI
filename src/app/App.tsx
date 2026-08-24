import { GlobalLoadingProvider } from "../shared/context/GlobalLoadingProvider";
import { AppContent } from "./AppContent";

export const App = () => {
  return (
    <GlobalLoadingProvider>
      <AppContent />
    </GlobalLoadingProvider>
  );
};
