import type { ClientesResponse } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const getClientes = async (): Promise<ClientesResponse> => {
  try {
    const response = await construcloudAPI.get<ClientesResponse>("/clientes");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener clientes", { cause: error });
  }
};
