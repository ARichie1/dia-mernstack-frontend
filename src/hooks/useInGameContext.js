import { useContext } from "react";
import { InGameContext } from "../contexts/InGameContext";

export const useInGameContext = () => {
    const context = useContext(InGameContext)

    if (!context) {
        throw Error("useInGameContext must be used inside an InGameContextProvider")
    }

    return context
}
