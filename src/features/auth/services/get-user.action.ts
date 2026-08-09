import { construcloudAPI } from "../../../shared/services/construcloud.api"


export interface UserResponse {
    id: number;
    email: string;
    razon_social: string | null;
    direccion_fiscal: string | null;
    documento: string | null;
    telefono: string | null;
    web: string | null;
}

export const getUser = async () => {
    try {
        const response = await construcloudAPI.get<UserResponse>("/auth/me");
        return response.data
    } catch (error) {
        throw new Error('Usuario no encontrado')
    }
}