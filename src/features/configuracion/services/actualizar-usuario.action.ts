import { construcloudAPI } from "../../../shared/services/construcloud.api";
import type { User } from "../../auth/context/AuthContext";

export interface ActualizarUsuarioRequest {
  razon_social?: string;
  documento?: string;
  direccion_fiscal?: string;
  telefono?: string;
  web?: string;
}

export const actualizarUsuario = async (
  data: ActualizarUsuarioRequest
): Promise<User> => {
  const response = await construcloudAPI.put("/auth/me", data);
  return response.data;
};
