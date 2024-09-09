import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import GameHeader from "./GameHeader";
import { useUserContext } from "../../hooks/useUserContext";

const GameHome = () => {
    const [showNavBlock, setShowNavBlock] = useState(true)
    let yes = false
    
    return (
        <div className="container-fluid game">
            <GameHeader showNavBlock={showNavBlock}/>
            {yes && setShowNavBlock(false)}
            <div className="gameUiWrapper">
                <Outlet />
            </div>
        </div>
    )
}

export default GameHome