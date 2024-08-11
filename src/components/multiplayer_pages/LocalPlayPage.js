import React from "react";
import { Outlet } from "react-router-dom";

const LocalPlayPage = () => {

    return (
        <div className="container">
            <h2>Local Play Page</h2>
            <Outlet />
        </div> 
    )
}

export default LocalPlayPage