import React from 'react'
import { useAppGlobalVariableContext } from '../../hooks/useAppGlobalVariableContext'
import { useInGameContext } from '../../hooks/useInGameContext'

const PlayerTab = ({playerInfo}) => {
    const {defaultImage} = useAppGlobalVariableContext()

    const {gameTime, gameMoves} = useInGameContext()

    return (
        <div className="playersStatWrapper">
            {playerInfo.image && 
                <div className="playerImg">
                    <img src={`../../../assets/images/faces/${playerInfo ? playerInfo.image : defaultImage}`} alt="pImg" />    
                </div>
            }
            {playerInfo.profileImage && 
                <div className="playerImg">
                    <img src={`../../../assets/images/faces/${playerInfo ? playerInfo.profileImage.value : defaultImage}`} alt="pImg" />    
                </div>
            }
            <div className="playerName">{playerInfo ? playerInfo.username : "name"}</div>
            <div className="playerCountry">usa</div>
            <div className="playerTime">{gameTime}:00</div>
            <div className="playerMoves">{gameMoves}</div>
        </div>
    )
}

export default PlayerTab