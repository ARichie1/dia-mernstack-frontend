import React from "react";
import { Outlet } from "react-router-dom";

const LocalPlayPage = () => {

    return (
        <div className="wrapper">
            <Outlet />
        </div> 
    )
}

export default LocalPlayPage