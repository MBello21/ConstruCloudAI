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

export interface Capitulo {
  id: number;
  numero: number;
  nombre: string;
  detalles: Detalle[];
}

export interface Detalle {
  id: number;
  numero: number;
  descripcion: string;
  cantidad: number;
  unidad: Unidad;
  precio_unitario: number;
  subtotal: number;
  generado_por_ia: boolean;
}

export const Unidad = {
  M: "m",
  M2: "m2",
  Ud: "ud",
} as const;
export type Unidad = (typeof Unidad)[keyof typeof Unidad];
