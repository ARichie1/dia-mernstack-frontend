import React from "react";
import { Outlet } from "react-router-dom";

const OnlinePlayPage = () => {

    return (
        <div className="wrapper">
            <Outlet />
        </div> 
    )
}

export default OnlinePlayPage