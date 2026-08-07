export interface Detalle {
  id: number | string;
  capitulo_id: number;
  numero: number;
  descripcion: string;
  unidad: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  generado_por_ia?: boolean;
}

export interface DetalleCreate {
  capitulo_id: number;
  numero: number;
  descripcion: string;
  unidad: string;
  cantidad: number;
  precio_unitario: number;
  subtotal?: number;
}

export interface DetalleUpdate {
  numero?: number;
  descripcion?: string;
  unidad?: string;
  cantidad?: number;
  precio_unitario?: number;
}

export type DetalleResponse = Detalle[];
export type GetDetalleResponse = Detalle;

export const Unidad = {
  M: "m",
  M2: "m2",
  Ud: "ud",
} as const;
export type Unidad = (typeof Unidad)[keyof typeof Unidad];
