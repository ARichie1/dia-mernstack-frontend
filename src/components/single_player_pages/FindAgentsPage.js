import React, { useContext } from "react";
import DifficultySelector from "../reuseable/pages/DifficultySelector";
import { Link } from "react-router-dom";
import { useGameContext } from "../../hooks/useGameContext";
import MoveInGameButton from "../reuseable/controls/MoveInGameButton";


const FindAgentsPage = (props) => {
    const {insertDifficulty, hasSelectedDifficulty} = useGameContext()
    
    return (
        <div className="findAgents wrapper">
            <DifficultySelector insertDifficulty={insertDifficulty}/>
            {hasSelectedDifficulty && 
                <div className="moveInGameButonWrapper">
                    <MoveInGameButton />
                </div>
            }
        </div>
    )
}

export default FindAgentsPage