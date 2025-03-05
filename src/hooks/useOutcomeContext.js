import { useContext } from "react";
import { OutcomeContext } from "../contexts/OutcomeContext";

export const useOutcomeContext = () => {
    const context = useContext(OutcomeContext)

    if (!context) {
        throw Error("useOutcomeContext must be used inside an OutcomeContextProvider")
    }

    return context
}
