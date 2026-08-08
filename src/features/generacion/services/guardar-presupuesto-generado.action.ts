import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { Capitulo } from "../../capitulos/capitulo.types";
import type { PresupuestoDetalle } from "../../presupuestos/presupuesto.types";

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

export interface GuardarPresupuestoRequest {
  presupuesto: PresupuestoGenerado
}

export interface GuardarPresupuestoResponse {
  id: number;
  presupuesto_id: number;
}

export const guardarPresupuestoGenerado = async (
  data: GuardarPresupuestoRequest,
): Promise<PresupuestoDetalle> => {
  try {
    const response = await construcloudAPI.post(
      "/presupuestos",
      data.presupuesto,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al guardar presupuesto`, { cause: error });
  }
};
