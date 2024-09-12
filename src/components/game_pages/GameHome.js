import React from "react";
import { Outlet } from "react-router-dom";
import GameHeader from "./GameHeader";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAppGlobalVariableContext } from "../../hooks/useAppGlobalVariableContext";

const GameHome = () => {
    const {user} = useAuthContext()
    const {showNavBlock} = useAppGlobalVariableContext()

    return (
        <div className="container-fluid game">
            <GameHeader showNavBlock={showNavBlock}/>
            {user && <div className="gameUiWrapper">
                <Outlet />
            </div>}
        </div>
    )
}

export default GameHome