import type { Capitulo, UpdateCapituloRequest } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const putCapitulo = async (
  id: number | string,
  data: UpdateCapituloRequest,
): Promise<Capitulo> => {
  try {
    const response = await construcloudAPI.put<Capitulo>(
      `/capitulos/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar capítulo con id ${id}`, {
      cause: error,
    });
  }
};
