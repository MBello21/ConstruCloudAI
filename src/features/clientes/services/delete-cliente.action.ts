import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const deleteCliente = async (id: number): Promise<void> => {
  try {
    await construcloudAPI.delete(`/clientes/${id}`);
  } catch (error) {
    throw new Error(`Error al eliminar cliente con id ${id}`, { cause: error });
  }
};
