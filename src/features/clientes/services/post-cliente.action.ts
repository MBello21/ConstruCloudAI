import type { Cliente, CreateClienteRequest } from "../../../shared/types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const postCliente = async (
  data: CreateClienteRequest,
): Promise<Cliente> => {
  try {
    const response = await construcloudAPI.post<Cliente>("/clientes", data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear cliente", { cause: error });
  }
};
