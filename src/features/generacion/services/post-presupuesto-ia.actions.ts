import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { Capitulo } from "../../capitulos/capitulo.types";

export interface PresupuestoIARequest {
  titulo: string;
  descripcion: string;
  materiales_por_cliente: boolean;
}

export interface PresupuestoGenerado {
  titulo: string
  descripcion: string
  cliente_id: number
  estado: string
  pago: string
  validez: string
  subtotal: number
  iva: number
  total: number
  capitulos: Capitulo[]
}


export interface PresupuestoIAResponse {
  presupuesto: PresupuestoGenerado,
  referencias: number
  similitud_promedio: number
  contexto_usado: []
  persistido: boolean
}

export const postPresupuesto = async (
  data: PresupuestoIARequest,
): Promise<PresupuestoIAResponse> => {
  try {
    const response = await construcloudAPI.post("/presupuestos/ia-rag", data);
    return response.data;
  } catch (error) {
    throw new Error("Error generando presupuesto", { cause: error });
  }
};