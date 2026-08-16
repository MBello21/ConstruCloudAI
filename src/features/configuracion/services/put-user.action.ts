import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { User } from "../../auth/context/AuthContext";

export interface UpdateUserRequest {
  nombre_completo?: string;
  cargo?: string;
  telefono?: string;
}

export const putUser = async (data: UpdateUserRequest): Promise<User> => {
  try {
    const response = await construcloudAPI.put<User>("/auth/me", data);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar tu perfil", { cause: error });
  }
};
