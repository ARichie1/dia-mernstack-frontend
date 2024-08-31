import React from "react";
import { Outlet } from "react-router-dom";

const GamePage = () => {

    return (
        <div className="gamePage mainWrapper">
            <Outlet />
        </div> 
    )
}

export default GamePage