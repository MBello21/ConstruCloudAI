import type { Cliente } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const getClienteById = async (id: number): Promise<Cliente> => {
  try {
    const response = await construcloudAPI.get<Cliente>(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener cliente con id ${id}`, { cause: error });
  }
};
