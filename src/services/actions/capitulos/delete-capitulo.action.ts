import { construcloudAPI } from "../../api/construcloud.api";

export const deleteCapitulo = async (id: number | string): Promise<void> => {
  try {
    await construcloudAPI.delete(`/capitulos/${id}`);
  } catch (error) {
    throw new Error(`Error al eliminar capítulo con id ${id}`, {
      cause: error,
    });
  }
};
