import React, { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { useOutcomeContext } from '../../hooks/useOutcomeContext'

const InGameMenu = () => {
    const {chosenDifficulty} = useContext(GameContext)
    const {setAndShowOutcomePopUp} = useOutcomeContext()

    return (
        <div className="inGameMenu">
            <button className="exit menuItem inGameBtn"
                onClick={() => setAndShowOutcomePopUp("exit")}>
                <span>Exit</span>
            </button>
            <button className="mainnGameAudio menuItem inGameBtn">
                <span>&#128266;</span>
            </button>
            <div className="agentToSelect menuItem inGameBtn">{chosenDifficulty.agents}</div>
        </div>
    )
}

export default InGameMenu