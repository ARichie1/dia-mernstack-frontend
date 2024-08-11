import React from "react";
import { Outlet } from "react-router-dom";

const SettingsPage = () => {

    return (
        <div className="container">
            <h2>SettingsPage</h2>
            <Outlet />
        </div> 
    )
}

export default SettingsPage