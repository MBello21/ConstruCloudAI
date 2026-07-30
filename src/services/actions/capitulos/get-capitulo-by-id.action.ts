import type { GetCapituloResponse } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const getCapituloById = async (
  id: number | string,
): Promise<GetCapituloResponse> => {
  try {
    const response = await construcloudAPI.get<GetCapituloResponse>(
      `/capitulos/${id}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener capítulo con id ${id}`, {
      cause: error,
    });
  }
};
