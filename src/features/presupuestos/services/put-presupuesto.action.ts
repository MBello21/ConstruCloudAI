import type {
  PutPresupuestoRequest,
  PutPresupuestoResponse,
} from "../../../shared/types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const putPresupuesto = async (
  id: number | string,
  data: PutPresupuestoRequest,
): Promise<PutPresupuestoResponse> => {
  try {
    const response = await construcloudAPI.put<PutPresupuestoResponse>(
      `/presupuestos/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error actualizando presupuesto`, { cause: error });
  }
};
