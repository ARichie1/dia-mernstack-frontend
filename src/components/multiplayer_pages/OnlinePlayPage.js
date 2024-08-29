import React from "react";
import { Outlet } from "react-router-dom";

const OnlinePlayPage = () => {

    return (
        <div className="wrapper">
            <h5 className="wrapperHeader">Play Online</h5>
            <Outlet />
        </div> 
    )
}

export default OnlinePlayPage