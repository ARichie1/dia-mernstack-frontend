import React from "react";
import { Link } from "react-router-dom";

const SurvivalModePage = () => {

    return (
        <div class="survivalMode wrapper">
            {/*<h3>SURVIVAL MODE</h3>*/}
            <div class="survivalGraphics">
                <span>&#128507;</span> 
                <span>&#127939;</span> 
                <span>&#128342;</span>
            </div>
            <h3>Crack As Many Codes As Possible On Time</h3>
            <div class="toGame clkBtn">
                <Link to="/game/in-game/single-player/:userid">Continue</Link>
            </div>
        </div>
    )
}

export default SurvivalModePage