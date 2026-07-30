import type {
  PutPresupuestoRequest,
  PutPresupuestoResponse,
} from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const putPresupuesto = async (
  id: number | string,
  data: PutPresupuestoRequest,
): Promise<PutPresupuestoResponse> => {
  try {
    const response = await construcloudAPI.put<PutPresupuestoResponse>(
      `/presupuesto/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error actualizando presupuesto`, { cause: error });
  }
};
