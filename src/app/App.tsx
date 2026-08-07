import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { StoreProvider } from "../state/StoreProvider";

export const App = () => {
  return (
    <StoreProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </StoreProvider>
  );
};
