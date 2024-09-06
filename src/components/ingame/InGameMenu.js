import React, { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

const InGameMenu = () => {
    const {chosenDifficulty} = useContext(GameContext)
    return (
        <div className="inGameMenu">
            <div className="exit menuItem inGameBtn">
                <span>Exit</span>
            </div>
            <div className="mainnGameAudio menuItem inGameBtn">
                <span>&#128266;</span>
            </div>
            <div className="agentToSelect menuItem inGameBtn">{chosenDifficulty.agents}</div>
        </div>
    )
}

export default InGameMenu