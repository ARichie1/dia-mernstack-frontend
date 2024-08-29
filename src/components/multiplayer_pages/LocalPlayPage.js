import React from "react";
import { Outlet } from "react-router-dom";

const LocalPlayPage = () => {

    return (
        <div className="wrapper">
            <h5 className="wrapperHeader">Play Local</h5>
            <Outlet />
        </div> 
    )
}

export default LocalPlayPage