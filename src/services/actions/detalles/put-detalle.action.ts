import type { Detalle, DetalleUpdate } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

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
