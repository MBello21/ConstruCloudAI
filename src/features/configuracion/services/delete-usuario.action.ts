import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const deleteUsuario = async (id: number): Promise<void> => {
  try {
    await construcloudAPI.delete(`/auth/usuarios/${id}`);
  } catch (error) {
    throw new Error("Error al eliminar el usuario", { cause: error });
  }
};
