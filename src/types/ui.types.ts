import type { Dispatch, SetStateAction } from "react";
import type { Presupuesto } from "./presupuesto.types";

export interface BadgeEstadoProps {
  estado: string;
}

export interface CabeceraTablaProps {
  totalRegistros: number;
  filtro: string;
  setFiltro: Dispatch<SetStateAction<string>>;
}

export interface TablaPresupuestosProps {
  presupuestos: Presupuesto[];
  formatearFecha: (fecha: string) => string;
  formatearPrecio: (importe: number) => string;
}

export interface PaginacionTablaProps {
  pagina: number;
  totalPaginas: number;
  onCambioPagina: (pagina: number) => void;
}
export interface EstadoConfig {
  bg: string;
  text: string;
  dot: string;
}
