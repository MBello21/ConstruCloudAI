import type { Detalle } from "./detalle.types";

export interface Capitulo {
  id: number;
  numero: number;
  nombre: string;
  detalles: Detalle[];
}
