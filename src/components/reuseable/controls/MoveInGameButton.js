import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../../hooks/useGameContext";
import socketInService from "../../../hooks/connections/socketService";
import socketGameService from "../../../hooks/connections/gameService";
import { useTimeContext } from "../../../hooks/useTimeContext";
import { useMoveContext } from "../../../hooks/useMoveContext";
import { useOutcomeContext } from "../../../hooks/useOutcomeContext";

const MoveInGameButton = () => {
    const navigate = useNavigate()
    const {defaultDifficulty, chosenDifficulty,
        insertDifficulty, gameMode,
        gameProperties,  switchGameLocation,
        setIsTurn, setIsReadyToPlay} = useGameContext()

    const { setCanSaveMe } = useOutcomeContext()
    const { initiateTimeCount } = useTimeContext()
    const { initiateMoveCount } = useMoveContext()
        

    // SOCKET IO - send game properties to server
    const sendGameProperties = async (readyToPlay) => {
        const socket = socketInService.socket
        await socketGameService.saveGameProperties(socket, gameProperties, readyToPlay)
        .then( ({saved}) => {
            console.log("saved");
            
            navigate("/game/in-game/single-player")
        })
    }

    const moveInGame = () => {
        if (gameMode === "survival-mode") {
            insertDifficulty(defaultDifficulty)
        }
        setIsReadyToPlay(true)
        setIsTurn(true)

        initiateTimeCount(chosenDifficulty.time)
        initiateMoveCount(chosenDifficulty.moves)

        setCanSaveMe(true)

        switchGameLocation("ingame")
        sendGameProperties(true)
    }

    return (
        <button className="moveInGameButton clkBtn"
            onClick={() => {moveInGame()}}>
            Play
        </button>
    )
}

export default MoveInGameButton