import type { ClientesPaginacionResponse } from "../../../shared/types";
import { construcloudAPI } from "../../../shared/services/construcloud.api";

export const getPaginationClientes = async (
  filtro: string,
  skip: number,
): Promise<ClientesPaginacionResponse> => {
  try {
    const response = await construcloudAPI.get<ClientesPaginacionResponse>(
      "/clientes/listado",
      {
        params: {
          estado: filtro === "Todos" ? undefined : filtro,
          skip: skip,
          limit: 7,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener clientes", { cause: error });
  }
};
