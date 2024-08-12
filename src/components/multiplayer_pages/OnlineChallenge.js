import React from "react";
import { Outlet } from "react-router-dom";

const OnlineChallenge = () => {

    return (
        <div className="wrapper">
            <Outlet />
        </div> 
    )
}

export default OnlineChallenge