import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { Empresa } from "../types/empresa.types";

export const getEmpresa = async (): Promise<Empresa> => {
  try {
    const response = await construcloudAPI.get<Empresa>("/empresa");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los datos de la empresa", { cause: error });
  }
};
