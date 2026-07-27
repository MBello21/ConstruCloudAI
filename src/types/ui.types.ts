import type { Dispatch, SetStateAction } from "react";
import type { Presupuesto } from "./presupuesto.types";
import type { Capitulo, Detalle } from "./capitulo.types";

export interface BadgeEstadoProps {
  estado: string;
}

export interface CabeceraTablaProps {
  totalRegistros: number;
  filtro: string;
  setFiltro: Dispatch<SetStateAction<string>>;
}

export interface FiltrosTablaProps {
  filtros: { label: string; value: string }[];
  filtro: string;
  setFiltro: Dispatch<SetStateAction<string>>;
}

export interface TablaPresupuestosProps {
  presupuestos: Presupuesto[];
  formatearFecha: (fecha: string) => string;
  formatearPrecio: (importe: number) => string;
}

export interface SckeletonTablaProps {
  showPagination: boolean;
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
export interface SectionHeaderConfig {
  title: string;
  section?: string;
  subtitle?: string;
  pathname: string;
}

export interface FormularioGeneracionProps {
  descripcion: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: () => void;
}

export interface SeccionCapitulosProps {
  capitulos: Capitulo[];
  onAgregarCapitulo: () => void;
  onEliminarCapitulo: (id: number | string) => void;
  onToggleCapitulo: (id: number | string) => void;
  onActualizarNombreCapitulo: (id: number | string, nombre: string) => void;
  onAgregarDetalle: (capituloId: number | string) => void;
  onEliminarDetalle: (
    capituloId: number | string,
    detalleId: number | string,
  ) => void;
  onActualizarDetalle: (
    capituloId: number | string,
    detalleId: number | string,
    cambios: Partial<Detalle>,
  ) => void;
}
