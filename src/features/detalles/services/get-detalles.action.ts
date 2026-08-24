import type { DetalleResponse } from "../detalle.types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const getDetalles = async (): Promise<DetalleResponse> => {
  try {
    const response = await construcloudAPI.get<DetalleResponse>("/detalles");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener detalles", { cause: error });
  }
};
