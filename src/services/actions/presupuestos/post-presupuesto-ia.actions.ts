import { construcloudAPI } from "../../api/construcloud.api";

export interface PresupuestoIARequest {
  titulo: string;
  descripcion: string;
  materiales_por_cliente: boolean;
}

export const postPresupuesto = async (data: PresupuestoIARequest) => {
  try {
    const response = await construcloudAPI.post("/presupuestos/ia-rag", data);
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo presupuestos`, { cause: error });
  }
};
