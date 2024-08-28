import React from "react";
import { Outlet } from "react-router-dom";

const SettingsPage = () => {

    return (
        <div className="settings mainWrapper">
            <Outlet />
        </div> 
    )
}

export default SettingsPage