import type { PresupuestoReponse } from "../../../shared/types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const getPresupuestos = async (
  filtro: string,
  skip: number,
): Promise<PresupuestoReponse> => {
  const response = await construcloudAPI.get<PresupuestoReponse>(
    "/presupuestos",
    {
      params: {
        estado: filtro === "Todos" ? undefined : filtro,
        skip: skip,
        limit: 7,
      },
    },
  );
  return response.data;
};
