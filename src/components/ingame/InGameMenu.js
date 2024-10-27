import React, { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

const InGameMenu = () => {
    const {chosenDifficulty} = useContext(GameContext)
    return (
        <div className="inGameMenu">
            <button className="exit menuItem inGameBtn">
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