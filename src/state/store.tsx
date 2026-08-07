import type { ClientesResponse } from "../shared/types";

interface Store {
  clientes: ClientesResponse[];
}

type Action = { type: "set_clientes"; payload: ClientesResponse[] };
export const initialStore = () => {
  return {
    clientes: [],
  };
};

export const storeReducer = (store: Store, action: Action): Store => {
  switch (action.type) {
    case "set_clientes":
      return {
        ...store,
        clientes: action.payload,
      };
    default:
      throw Error("Unknow action.");
  }
};
