import { useReducer } from "react"
import { StoreContext } from "./StoreContext"
import { initialStore, storeReducer } from "./store"

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [store, dispatch] = useReducer(storeReducer, initialStore())
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}
