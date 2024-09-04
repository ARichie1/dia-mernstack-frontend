import React from 'react'

const InGameMenu = () => {
    return (
        <div className="inGameMenu">
            <div className="exit menuItem inGameBtn">
                <span>Exit</span>
            </div>
            <div className="mainnGameAudio menuItem inGameBtn">
                <span>&#128266;</span>
            </div>
            <div className="agentToSelect menuItem inGameBtn">4</div>
        </div>
    )
}

export default InGameMenu