import { construcloudAPI } from "../../../shared/services/construcloud.api"


export interface UserResponse {
    id: number;
    email: string;
    nombre_completo: string | null;
    cargo: string | null;
    rol: string | null;
    telefono: string | null;
    empresa_id: number | null;
    is_active: boolean;
}

export const getUser = async () => {
    try {
        const response = await construcloudAPI.get<UserResponse>("/auth/me");
        return response.data
    } catch (error) {
        throw new Error('Usuario no encontrado')
    }
}