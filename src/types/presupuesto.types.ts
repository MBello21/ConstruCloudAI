import type { Capitulo } from "./capitulo.types";

export interface Presupuesto {
  id: number;
  codigo: string;
  titulo: string;
  total: number;
  estado: string;
  created_at: string;
}

export interface PresupuestoDetalle {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  subtotal: number;
  iva: number;
  total: number;
  capitulos: Capitulo[];
}
