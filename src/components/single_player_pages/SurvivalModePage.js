import React, { useEffect } from "react";
import MoveInGameButton from "../reuseable/controls/MoveInGameButton";
import { useGameContext } from "../../hooks/useGameContext";

const SurvivalModePage = () => {
    return (
        <div className="survivalMode wrapper">
            {/*<h3>SURVIVAL MODE</h3>*/}
            <div className="survivalGraphics">
                <span>&#128507;</span> 
                <span>&#127939;</span> 
                <span>&#128342;</span>
            </div>
            <h3>Crack As Many Codes As Possible On Time</h3>
            <div className="moveInGameButonWrapper">
                <MoveInGameButton />
            </div>
        </div>
    )
}

export default SurvivalModePage

