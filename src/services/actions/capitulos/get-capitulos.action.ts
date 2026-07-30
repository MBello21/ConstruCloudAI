import type { CapituloResponse } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const getCapitulos = async (): Promise<CapituloResponse> => {
  try {
    const response = await construcloudAPI.get<CapituloResponse>("/capitulos");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener capítulos", { cause: error });
  }
};
