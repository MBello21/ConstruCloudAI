import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { Layout } from "./Layout";
import { NotFound } from "./NotFound";
import { Panel } from "../features/panel/Panel";
import { GenerarPresupuesto } from "../features/presupuestos/GenerarPresupuesto";
import { Presupuestos } from "../features/presupuestos/Presupuestos";
import { DetallePresupuesto } from "../features/presupuestos/DetallePresupuesto";
import { Clientes } from "../features/clientes/Clientes";
import { ClienteDetalle } from "../features/clientes/ClienteDetalle";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<NotFound />}>
        <Route path="/" element={<Panel />} />
        <Route path="/presupuestos" element={<Presupuestos />} />
        <Route path="/clientes" element={<Clientes />} />
      </Route>
      <Route path="/presupuesto/:id" element={<DetallePresupuesto />} />
      <Route path="/clientes/:id" element={<ClienteDetalle />} />
      <Route path="/nuevo-presupuesto" element={<GenerarPresupuesto />} />
    </>,
  ),
);
