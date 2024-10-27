import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUserContext";
import { useGameContext } from "../../../hooks/useGameContext";

const WaitingToPlay = () => {
    const navigate = useNavigate()
    const { currentOpponent } = useUserContext()
    const {isReadyToPlay, isOpponentReadyToPlay,
            switchGameLocation
                } = useGameContext()

    const moveToInGame = () => {navigate("/game/in-game/single-player/:userid")}
    
    useEffect(() => {
        // Move To InGame If Both Players Are Ready
        if (isReadyToPlay && isOpponentReadyToPlay) {
            console.log("Moving To Ingame ...");
            
            switchGameLocation("ingame")
            moveToInGame()   
        }
    }, [isReadyToPlay, isOpponentReadyToPlay])

    return (
        <div className="waitingToPlay">
            Waiting For {currentOpponent.username} To Build Code ...

            <button>Hasten Opponent</button>
        </div>
    )
}

export default WaitingToPlay