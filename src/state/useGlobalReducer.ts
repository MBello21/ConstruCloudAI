import { useContext } from "react";
import { StoreContext } from "./StoreContext";


export default function useGlobalReducer() {
    const context = useContext(StoreContext)
    if (!context) throw new Error('useGlobalReducer must be used within StoreProvider')
    return context
}