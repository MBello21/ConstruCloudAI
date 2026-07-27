import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";

export const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
};
