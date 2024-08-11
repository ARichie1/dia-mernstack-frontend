import React from "react";
import { Outlet } from "react-router-dom";
import GameHeader from "./GameHeader";

const GameHome = () => {
    return (
        <div className="container-fluid game">
            <GameHeader />
            <Outlet />
        </div>
    )
}

export default GameHome