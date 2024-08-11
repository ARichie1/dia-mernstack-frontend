import React from "react";
import { Outlet } from "react-router-dom";

const OnlinePlayPage = () => {

    return (
        <div className="container">
            <h2>Online Play Page</h2>
            <Outlet />
        </div> 
    )
}

export default OnlinePlayPage