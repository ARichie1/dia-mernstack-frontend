import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import GameHeader from "./GameHeader";
import { useAuthContext } from "../../hooks/useAuthContext";

const GameHome = () => {
    const [showNavBlock, setShowNavBlock] = useState(true)
    let yes = false

    const {user} = useAuthContext()

    return (
        <div className="container-fluid game">
            <GameHeader showNavBlock={showNavBlock}/>
            {yes && setShowNavBlock(false)}
            {user && <div className="gameUiWrapper">
                <Outlet />
            </div>}
        </div>
    )
}

export default GameHome