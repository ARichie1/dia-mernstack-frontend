import React from "react";
import { Outlet } from "react-router-dom";

const MultiplayerPage = () => {

    return (
        <div className="container">
            <h2>Multiplayer Page</h2>
            <Outlet />
        </div> 
    )
}

export default MultiplayerPage