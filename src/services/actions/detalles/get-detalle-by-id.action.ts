import type { GetDetalleResponse } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const getDetalleById = async (
  id: number | string,
): Promise<GetDetalleResponse> => {
  try {
    const response = await construcloudAPI.get<GetDetalleResponse>(
      `/detalles/${id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener detalle con id ${id}`, {
      cause: error,
    });
  }
};
