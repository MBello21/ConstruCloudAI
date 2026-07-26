import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Panel } from "./features/Panel";
import { GenerarPresupuesto } from "./features/GenerarPresupuesto";
import { Presupuestos } from "./features/Presupuestos";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
        <Route path="/" element={<Panel />} />
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/nuevo-presupuesto" element={<GenerarPresupuesto />} />
      </Route>
    </>,
  ),
);
