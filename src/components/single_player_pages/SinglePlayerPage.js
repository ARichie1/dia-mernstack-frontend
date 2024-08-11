import React from "react";
import { Outlet } from "react-router-dom";

const SinglePlayerPage = () => {

    return (
        <div className="container">
            <div class="singlePlayer">
                <h2>SINGLE PLAYER</h2>
                <Outlet />
            </div>
        </div> 
    )
}

export default SinglePlayerPage