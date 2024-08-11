import React from "react";
import { Outlet } from "react-router-dom";

const OnlineChallenge = () => {

    return (
        <div className="container">
            <h2>OnlineChallenge</h2>
            <Outlet />
        </div> 
    )
}

export default OnlineChallenge