import React, { useContext } from "react";
import Screen from "./Screen";
import InGameCodeButtons from "./InGameCodeButtons";
import { GameContext } from "../../contexts/GameContext";

const SelectCodePage = () => {
    const {chosenDifficulty} = useContext(GameContext)
    return (
        <div className="codeSelection inGame">
            <div className="instruction">
                <h3>Select Your {chosenDifficulty.agents} Secret AGENTS</h3>
                <p>Click &#128065; To View Code</p>
            </div>
            <Screen />
            <InGameCodeButtons />
        </div>
    )
}

export default SelectCodePage