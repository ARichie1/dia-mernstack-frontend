import React, { useContext, useEffect } from "react";
import socketInService from "../../hooks/connections/socketService";
import socketGameService from "../../hooks/connections/gameService";
import { useUserContext } from "../../hooks/useUserContext";
import { useGameContext } from "../../hooks/useGameContext";
import Screen from "./Screen";
import InGameCodeButtons from "./InGameCodeButtons";
import WaitingToPlay from "../reuseable/pages/WaitingToPlay";

const SelectCodePage = () => {
    const {chosenDifficulty, isReadyToPlay,
            isOpponentReadyToPlay,  setIsOpponentReadyToPlay
                } = useGameContext()

    const { currentOpponent } = useUserContext()

    const recieveOpponentRTPS = async (interval) => {
        const socket = socketInService.socket
        const recieved = await socketGameService.recieveOpponentReadyToPlayState(socket)
        .then(({opponentIsReady})=> {
            
            if (opponentIsReady) {
                console.log("Opponent Is Ready To Play.");

                // Player Becomes Ready To Build Code When Host Is Ready
                setIsOpponentReadyToPlay(opponentIsReady)

                console.log("oppo ready : ", opponentIsReady);
                // Stop the gameProps checker
                clearInterval(interval)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        // Check if opponent is ready
        const checkingOpponentReadyToPlayState = setInterval( () => {
            console.log("Checking opp side ...");
            recieveOpponentRTPS(checkingOpponentReadyToPlayState)
        }, 10000);
    })

    return (
        <div className="codeSelection inGame">
            {!isReadyToPlay && 
                <div>
                    {isOpponentReadyToPlay && 
                        <div>{currentOpponent.username} is ready to play</div>}
                    <div className="instruction">
                        <h3>Select Your {chosenDifficulty.agents} Secret AGENTS</h3>
                        <p>Click &#128065; To View Code</p>
                    </div>
                    <Screen />
                    <InGameCodeButtons />
                </div>}
            {isReadyToPlay && <WaitingToPlay />}
        </div>
    )
}

export default SelectCodePage