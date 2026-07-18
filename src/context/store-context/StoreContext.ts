import { createContext, type Dispatch } from "react";
interface StoreContextType {
    store: any
    dispatch: Dispatch<any>
}

export const StoreContext = createContext<StoreContextType | null>(null)