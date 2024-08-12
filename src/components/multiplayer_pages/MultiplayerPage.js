import React from "react";
import { Outlet } from "react-router-dom";

const MultiplayerPage = () => {

    return (
        <div className="mainWrapper">
            <Outlet />
        </div> 
    )
}

export default MultiplayerPage