import type { Detalle, DetalleCreate } from "../detalle.types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const postDetalle = async (
  data: DetalleCreate,
): Promise<Detalle> => {
  try {
    const response = await construcloudAPI.post<Detalle>("/detalles", data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear detalle", { cause: error });
  }
};
