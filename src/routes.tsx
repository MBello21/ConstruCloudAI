import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Feature } from "./features/Feature";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
        <Route path="/" element={<Feature />} />
      </Route>
    </>,
  ),
);
