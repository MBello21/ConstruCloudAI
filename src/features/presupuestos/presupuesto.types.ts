import type { Capitulo } from "../capitulos/capitulo.types";

export interface PresupuestoReponse {
  total: number;
  presupuestos: PresupuestoElement[];
}

export interface PresupuestoElement {
  id: number;
  codigo: string;
  nombre_cliente?: string;
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
  cliente_id?: number;
  cliente?: { cliente_id: number; nombre_cliente: string };
  codigo: string;
  validez_dias: number;
  condiciones_pago: string;
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

export interface PutPresupuestoRequest {
  titulo?: string;
  descripcion?: string;
  estado?: string;
  cliente_id?: number;
  validez_dias?: number;
  condiciones_pago?: string;
}

export interface PutPresupuestoResponse {
  id: number;
  titulo: string;
  actualizado: boolean;
}

export interface DeletePresupuestoResponse {
  id: number;
  eliminado: boolean;
}

export interface PresupuestoFormData {
  id?: number;
  titulo?: string;
  estado?: string;
  cliente_id?: number | null;
}
