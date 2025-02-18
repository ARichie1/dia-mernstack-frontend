import React from 'react'
import { useAppGlobalVariableContext } from '../../hooks/useAppGlobalVariableContext'

const PlayerTab = ({playerInfo}) => {
    const {defaultImage} = useAppGlobalVariableContext()

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
            <div className="playerTime">0:00</div>
            <div className="playerMoves">10</div>
        </div>
    )
}

export default PlayerTab