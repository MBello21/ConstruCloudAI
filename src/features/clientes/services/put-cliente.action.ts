import type { Cliente, UpdateClienteRequest } from "../../../shared/types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const putCliente = async (
  id: number,
  data: UpdateClienteRequest,
): Promise<Cliente> => {
  try {
    const response = await construcloudAPI.put<Cliente>(
      `/clientes/${id}`,
      data,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar cliente con id ${id}`, {
      cause: error,
    });
  }
};
