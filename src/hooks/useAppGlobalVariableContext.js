import { useContext } from "react";
import { AppGlobalVariableContext } from "../contexts/AppGlobalVariableContext";
export const useAppGlobalVariableContext = () => {
    const context = useContext(AppGlobalVariableContext)

    if (!context) {
        throw Error("useAppGlobalVariableContext must be used inside an AppGlobalVariableContextProvider")
    }

    return context
}