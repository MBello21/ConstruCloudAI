import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import type { Navegation } from "../types";

export const NAVEGATION: Navegation[] = [
  {
    icon: LayoutDashboard,
    label: "Panel",
    path: "/",
  },
  {
    icon: FileText,
    label: "Presupuestos",
    path: "/presupuestos",
  },
  {
    icon: Building2,
    label: "Obras",
    path: "/obras",
  },
  {
    icon: Users,
    label: "Clientes",
    path: "/clientes",
  },
  {
    icon: BarChart3,
    label: "Informes",
    path: "Informes",
  },
  {
    icon: Settings,
    label: "Configuración",
    path: "/configuracion",
  },
];
