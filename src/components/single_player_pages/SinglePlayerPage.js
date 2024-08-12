import React from "react";
import { Outlet } from "react-router-dom";

const SinglePlayerPage = () => {
    return (
        <div className="singlePlayer mainWrapper">
            <Outlet />
        </div>
    )
}

export default SinglePlayerPage