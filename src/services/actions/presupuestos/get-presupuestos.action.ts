import type { PresupuestoReponse } from "../../../types";
import { construcloudAPI } from "../../api/construcloud.api";

export const getPresupuestos = async (
  skip: number,
): Promise<PresupuestoReponse> => {
  const response = await construcloudAPI.get<PresupuestoReponse>(
    "/presupuestos",
    {
      params: {
        skip: skip,
        limit: 7,
      },
    },
  );
  return response.data;
};
