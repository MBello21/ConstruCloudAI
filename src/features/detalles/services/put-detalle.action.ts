import type { Detalle, DetalleUpdate } from "../detalle.types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const putDetalle = async (
  id: number | string,
  data: DetalleUpdate,
): Promise<Detalle> => {
  try {
    const response = await construcloudAPI.put<Detalle>(
      `/detalles/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar detalle con id ${id}`, {
      cause: error,
    });
  }
};
