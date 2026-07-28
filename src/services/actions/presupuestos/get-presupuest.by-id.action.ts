import type { PresupuestoDetalle } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const getPresupuestosByID = async (
  id: number,
): Promise<PresupuestoDetalle> => {
  try {
    const response = await construcloudAPI.get<PresupuestoDetalle>(
      `/presupuestos/${id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo presupuestos`, { cause: error });
  }
};
