import React, { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { useInGameContext } from '../../hooks/useInGameContext'

const InGameMenu = () => {
    const {chosenDifficulty} = useContext(GameContext)
    const {setshowOutcomePopUp} = useInGameContext()

    return (
        <div className="inGameMenu">
            <button className="exit menuItem inGameBtn"
                onClick={() => setshowOutcomePopUp(true)}>
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