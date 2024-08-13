import React from "react";
import DifficultySelector from "../reuseable/pages/DifficultySelector";


const FindAgentsPage = (props) => {

    return (
        <div className="findAgents wrapper">
            <DifficultySelector />
            <div className="continueToGame toGame" id="singlePlayerMainGame">CONTINUE</div>
        </div>
    )
}

export default FindAgentsPage