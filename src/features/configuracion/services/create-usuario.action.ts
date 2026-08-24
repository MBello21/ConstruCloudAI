import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { User } from "../../auth/context/AuthContext";

export interface CreateUsuarioRequest {
  email: string;
  password: string;
  nombre_completo: string;
  rol: string;
}

export const createUsuario = async (
  data: CreateUsuarioRequest
): Promise<User> => {
  try {
    const response = await construcloudAPI.post<User>("/auth/usuarios", data);
    return response.data;
  } catch (error) {
    throw new Error("Error al crear el usuario", { cause: error });
  }
};
