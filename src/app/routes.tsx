import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router";
import { Layout } from "./Layout";
import { NotFound } from "./NotFound";
import { Panel } from "../features/panel/Panel";
import { GenerarPresupuesto } from "../features/generacion/GenerarPresupuesto";
import { Presupuestos } from "../features/presupuestos/Presupuestos";
import { DetallePresupuesto } from "../features/presupuestos/DetallePresupuesto";
import { Clientes } from "../features/clientes/Clientes";
import { ClienteDetalle } from "../features/clientes/ClienteDetalle";
import { Login } from "../features/auth/Login";
import { Signup } from "../features/auth/Signup";
import { PublicRoute } from "../features/auth/components/PublicRoute";
import { AuthLayout } from "./AuthLayout";
import { Configuracion } from "../features/configuracion/Configuracion";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/" element={<Layout />} errorElement={<NotFound />}>
          <Route index element={<Navigate to="/panel" replace />} />
          <Route path="panel" element={<Panel />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="presupuesto/:id" element={<DetallePresupuesto />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="clientes/:id" element={<ClienteDetalle />} />
          <Route path="nuevo-presupuesto" element={<GenerarPresupuesto />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>,
  ),
);
