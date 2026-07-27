import type { Capitulo } from "./capitulo.types";

export interface PresupuestoReponse {
  total: number;
  presupuestos: PresupuestoElement[];
}

export interface PresupuestoElement {
  id: number;
  codigo: string;
  titulo: string;
  total: number;
  estado: Estado;
  created_at: string;
}

export type Presupuesto = PresupuestoElement;

export type Estado =
  | "Borrador"
  | "Enviado"
  | "En Revisión"
  | "Pendiente"
  | "Aprobado"
  | "Rechazado";
export interface PresupuestoDetalle {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  estado: string;
  subtotal: number;
  iva: number;
  total: number;
  capitulos: Capitulo[];
  created_at?: string;
}

export interface MetricasResponse {
  total: number;
  aprobados: number;
  pendientes: number;
  tasa_aprobacion: number;
  importe_total: number;
  variacion_total: number;
  variacion_aprobados: number;
  variacion_importe: number;
}
