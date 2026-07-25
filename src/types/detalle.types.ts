export interface Detalle {
  id: number | string;
  numero?: number;
  descripcion: string;
  cantidad: number;
  unidad: string;
  precio_unitario: number;
  subtotal: number;
  generado_por_ia?: boolean;
}

export const Unidad = {
  M: "m",
  M2: "m2",
  Ud: "ud",
} as const;
export type Unidad = (typeof Unidad)[keyof typeof Unidad];
