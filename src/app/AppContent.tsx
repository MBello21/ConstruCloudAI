import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { StoreProvider } from "../state/StoreProvider";
import { SplashScreen } from "../shared/components/SplashScreen";
import { useInitialLoading } from "../shared/hooks";

export const AppContent = () => {
  const isInitialLoad = useInitialLoading();

  return (
    <>
      {isInitialLoad && <SplashScreen />}
      <StoreProvider>
        <Toaster position="top-right" />
        <RouterProvider router={router} />
      </StoreProvider>
    </>
  );
};
