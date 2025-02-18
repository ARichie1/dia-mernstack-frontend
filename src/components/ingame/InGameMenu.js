import React, { useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { useNavigate } from 'react-router-dom'

const InGameMenu = () => {
    const navigate = useNavigate()

    const {chosenDifficulty} = useContext(GameContext)
    return (
        <div className="inGameMenu">
            <button className="exit menuItem inGameBtn"
                onClick={() => navigate("/")}>
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