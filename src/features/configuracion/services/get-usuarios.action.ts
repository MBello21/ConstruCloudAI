import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { User } from "../../auth/context/AuthContext";

export const getUsuarios = async (): Promise<User[]> => {
  try {
    const response = await construcloudAPI.get<User[]>("/auth/usuarios");
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener los usuarios", { cause: error });
  }
};
