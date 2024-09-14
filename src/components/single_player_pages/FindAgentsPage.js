import React, { useContext } from "react";
import DifficultySelector from "../reuseable/pages/DifficultySelector";
import { GameContext } from "../../contexts/GameContext";
import { Link } from "react-router-dom";


const FindAgentsPage = (props) => {
    const {insertDifficulty} = useContext(GameContext)
    
    return (
        <div className="findAgents wrapper">
            <DifficultySelector insertDifficulty={insertDifficulty}/>
            <div className="continueToGame toGame clkBtn" id="singlePlayerMainGame">
                <Link to="/game/in-game/single-player/:userid">CONTINUE</Link>
            </div>
        </div>
    )
}

export default FindAgentsPage