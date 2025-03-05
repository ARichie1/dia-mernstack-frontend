import { useContext } from "react";
import { TimeContext } from "../contexts/TimeContext";

export const useTimeContext = () => {
    const context = useContext(TimeContext)

    if (!context) {
        throw Error("useTimeContext must be used inside an TimeContextProvider")
    }

    return context
}
