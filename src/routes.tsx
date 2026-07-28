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
import { DetallePresupuesto } from "./features/DetallePresupuesto";
import { Clientes } from "./features/Clientes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
        <Route path="/" element={<Panel />} />
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/clientes" element={<Clientes />} />
      </Route>
      <Route path="/presupuesto/:id" element={<DetallePresupuesto />} />
      <Route path="/nuevo-presupuesto" element={<GenerarPresupuesto />} />
    </>,
  ),
);
