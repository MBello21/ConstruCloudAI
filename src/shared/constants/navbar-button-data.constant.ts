import type { NavbarBoton } from "../types/ui.types";

export const BOTONES_POR_RUTA: NavbarBoton[] = [
  {
    path: "/presupuestos",
    label: "Nuevo presupuesto",
    to: "/nuevo-presupuesto",
  },
  { path: "/clientes", label: "Nuevo cliente", action: "modal" },
];
