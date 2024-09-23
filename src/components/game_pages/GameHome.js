import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAppGlobalVariableContext } from "../../hooks/useAppGlobalVariableContext";
import socketInService from "../../hooks/connections/socketService";
import socketGameService from "../../hooks/connections/gameService";
import GameHeader from "./GameHeader";

const GameHome = () => {
    const {user, userInfo: currentPlayer} = useAuthContext()
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