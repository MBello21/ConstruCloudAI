import { construcloudAPI } from "../../api/construcloud.api";

export const deleteDetalle = async (id: number | string): Promise<void> => {
  try {
    await construcloudAPI.delete(`/detalles/${id}`);
  } catch (error) {
    throw new Error(`Error al eliminar detalle con id ${id}`, {
      cause: error,
    });
  }
};
