import React, { useContext } from "react";
import DifficultySelector from "../reuseable/pages/DifficultySelector";
import { GameContext } from "../../contexts/GameContext";


const FindAgentsPage = (props) => {
    const {insertDifficulty} = useContext(GameContext)
    
    return (
        <div className="findAgents wrapper">
            <DifficultySelector insertDifficulty={insertDifficulty}/>
            <div className="continueToGame toGame" id="singlePlayerMainGame">CONTINUE</div>
        </div>
    )
}

export default FindAgentsPage