import { construcloudAPI } from "../../../shared/services/construcloud.api";

export interface SignupRequest {
  email: string;
  password: string;
  nombre_completo?: string;
}

export interface SignupResponse {
  access_token: string;
  token_type: string;
}

export const signup = async (
  credentials: SignupRequest,
): Promise<SignupResponse> => {
  try {
    const response = await construcloudAPI.post<SignupResponse>(
      "/auth/signup",
      credentials,
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error al crear la cuenta", { cause: error });
    }
    throw new Error("Error al crear la cuenta", { cause: error });
  }
};
