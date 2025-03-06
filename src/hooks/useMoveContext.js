import { useContext } from "react";
import { MoveContext } from "../contexts/MoveContext";

export const useMoveContext = () => {
    const context = useContext(MoveContext)

    if (!context) {
        throw Error("useMoveContext must be used inside an MoveContextProvider")
    }

    return context
}
