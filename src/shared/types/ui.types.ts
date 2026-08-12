import type { Dispatch, SetStateAction } from "react";

import type { Capitulo } from "../../features/capitulos/capitulo.types";
import type { Detalle } from "../../features/detalles/detalle.types";
import type { Cliente } from "../../features/clientes/cliente.types";
import type {
  Presupuesto,
  PresupuestoElement,
} from "../../features/presupuestos/types/presupuesto.types";

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
  setFiltro?: Dispatch<SetStateAction<string>>;
  handleFiltro?: (nuevoFiltro: string) => void;
}

export interface TablaPresupuestosProps {
  presupuestos: Presupuesto[];
  formatearFecha: (fecha: string) => string;
  formatearPrecio: (importe: number) => string;
  onEditar: (presupuesto: PresupuestoElement) => void;
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
  capitulosAbiertos: Set<string | number>;
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

export interface MetricCardProps {
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  variacion?: number;
  destacado?: boolean;
  icon?: string;
}

export interface ClienteComboboxProps {
  clientes: Cliente[];
  value: number | null;
  onChange: (clienteId: number | null) => void;
  onCrearNuevo: () => void;
  placeholder?: string;
}

export interface ModalNuevoClienteProps {
  isOpen: boolean;
  onClose: () => void;
  onClienteCreado: (cliente: Cliente) => void;
}

export type NavbarBoton =
  | {
      path: string;
      label: string;
      to: string;
    }
  | {
      path: string;
      label: string;
      action: "modal";
    };
