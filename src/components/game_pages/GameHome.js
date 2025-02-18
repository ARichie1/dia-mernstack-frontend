import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAppGlobalVariableContext } from "../../hooks/useAppGlobalVariableContext";
import socketInService from "../../hooks/connections/socketService";
import socketGameService from "../../hooks/connections/gameService";
import GameHeader from "./GameHeader";
import { useGameContext } from "../../hooks/useGameContext";

const GameHome = () => {
    const {user, userInfo: currentPlayer} = useAuthContext()
    const {showNavBlock} = useAppGlobalVariableContext()
    const {isInGame, isOutGame} = useGameContext()

    return (
        <div className="container-fluid game">
            {isOutGame && 
                <GameHeader showNavBlock={showNavBlock}/>}
            {user && 
                <div className="gameUiWrapper"
                    style={{height: isInGame ? "100%" : "90%"}}>
                    <Outlet />
                </div>
            }
        </div>
    )
}

export default GameHome