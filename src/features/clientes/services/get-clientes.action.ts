import type { ClientesResponse } from "../../../shared/types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const getClientes = async (): Promise<ClientesResponse> => {
  try {
    const response = await construcloudAPI.get<ClientesResponse>("/clientes");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener clientes", { cause: error });
  }
};
