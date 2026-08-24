import type { MetricasResponse } from "../../../shared/types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const getMetricas = async (): Promise<MetricasResponse> => {
  try {
    const response = await construcloudAPI.get<MetricasResponse>(
      "/presupuestos/metricas",
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener métricas", { cause: error });
  }
};
