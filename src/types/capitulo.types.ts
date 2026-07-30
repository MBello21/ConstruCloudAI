import type { Detalle } from "./detalle.types";

export type { Detalle };

export interface Capitulo {
  id: number;
  presupuesto_id: number;
  numero: number;
  nombre: string;
  orden: number;
}

export interface CreateCapituloRequest {
  presupuesto_id: number;
  numero: number;
  nombre: string;
  orden?: number;
}

export interface UpdateCapituloRequest {
  nombre?: string;
  numero?: number;
  orden?: number;
}

export type CapituloResponse = Capitulo[];
export type GetCapituloResponse = Capitulo;
