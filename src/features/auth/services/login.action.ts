import { construcloudAPI } from "../../../shared/services/construcloud.api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await construcloudAPI.post<LoginResponse>(
      "/auth/login",
      credentials,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Email o contraseña incorrectos", { cause: error });
    }
    throw new Error("Error al iniciar sesión", { cause: error });
  }
};
