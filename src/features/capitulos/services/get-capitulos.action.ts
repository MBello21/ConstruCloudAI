import type { CapituloResponse } from "../capitulo.types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const getCapitulos = async (): Promise<CapituloResponse> => {
  try {
    const response = await construcloudAPI.get<CapituloResponse>("/capitulos");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener capítulos", { cause: error });
  }
};
