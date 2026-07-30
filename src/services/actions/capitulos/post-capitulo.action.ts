import type { Capitulo, CreateCapituloRequest } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const postCapitulo = async (
  data: CreateCapituloRequest,
): Promise<Capitulo> => {
  try {
    const response = await construcloudAPI.post<Capitulo>("/capitulos", data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear capítulo", { cause: error });
  }
};
