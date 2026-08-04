import type { DeletePresupuestoResponse } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const deletePresupuesto = async (
  id: number | string,
): Promise<DeletePresupuestoResponse> => {
  try {
    const response = await construcloudAPI.delete<DeletePresupuestoResponse>(
      `/presupuestos/${id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error eliminando presupuesto`, { cause: error });
  }
};
