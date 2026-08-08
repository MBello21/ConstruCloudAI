import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { Capitulo } from "../../capitulos/capitulo.types";
import type { PresupuestoDetalle } from "../../presupuestos/presupuesto.types";

export interface GuardarPresupuestoRequest {
  titulo: string;
  descripcion: string;
  materiales_por_cliente: boolean;
  capitulos: Capitulo[];
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
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al guardar presupuesto`, { cause: error });
  }
};
