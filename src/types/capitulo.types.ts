import type { Detalle } from "./detalle.types";

export type { Detalle };

export interface Capitulo {
  id: number | string;
  numero?: number;
  nombre: string;
  abierto?: boolean;
  detalles: Detalle[];
}
