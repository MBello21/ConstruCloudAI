import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { Empresa, EmpresaUpdate } from "../types/empresa.types";

export const putEmpresa = async (data: EmpresaUpdate): Promise<Empresa> => {
  try {
    const response = await construcloudAPI.put<Empresa>("/empresa", data);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar los datos de la empresa", { cause: error });
  }
};
