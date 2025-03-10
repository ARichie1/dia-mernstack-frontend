import React, { useContext, useEffect, useState } from "react";
import Screen from "../../ingame/Screen";
import PowerUps from "../../ingame/PowerUps";
import InGameMenu from "../../ingame/InGameMenu";
import InGameCodeButtons from "../../ingame/InGameCodeButtons";
import { useGameContext } from "../../../hooks/useGameContext";
import { useInGameContext } from "../../../hooks/useInGameContext";
import OutComePopUp from "../pop_ups/OutComePopUp";
import { useTimeContext } from "../../../hooks/useTimeContext";

const GameScene = () => {

    const {gameType, isMultiplayer, isTurn,
        isTimeCountDownEnabled, isMoveCountDownEnabled
    } = useGameContext()

    const {resumeMove, resumeTime} = useTimeContext()

    const {showPlayerPredictions, setShowPlayerPredictions,
        showOpponentPredictions, setShowOpponentPredictions,
        } = useInGameContext()

    const checkForPlayerTurn = () => {
        const turnCheckerInterval = setInterval(() => {
            if (isTurn) {
                // Resume counting the deadline params
                if (isTimeCountDownEnabled) {resumeTime()}
                if (isMoveCountDownEnabled) {resumeMove()}
            }else{
                clearInterval(turnCheckerInterval)
            }
        }, 1000);
    }

    // WORK ON DEADLINE BUGS IN MULTIPLAYER MODE
    // 1. TIME OVER MULTIPLING WHEN GAME BEGINS
    // 2. OPPONENT TIME ON PLAYER SCREEN NOT SYNCING
    // 3. OUTCOME FOR MULTIPLAYER
    // IF A PLAYER EXIT, THE OTHER PLAYER SHOULD KNOW AND WIN THE GAME
    // IF A PLAYER WINS OR LOSSES OUTCOME (LOSS ON DEADLINES OR ANOTHER PLAYER CRACKS THE CODE)
    // INTEGRATED PLAYER NETWORK CONNECTIVITY(NETWORK BARS)
     
    useEffect(() => {
        if (isTurn) {

            console.log("is turn");
            
            // Resume counting the deadline params
            if (isTimeCountDownEnabled) {resumeTime()}
            if (isMoveCountDownEnabled) {resumeMove()}
        }
    }, [isTurn])

    return (
        <div className="inGame">
            {isMultiplayer && <button className="opponentGuessesBtn guessesBtn inGameBtn"
                onClick={() => 
                    {setShowOpponentPredictions(!showOpponentPredictions);
                        setShowPlayerPredictions(false)
                    }}>{showOpponentPredictions ? "C" : "O"}
            </button>}
            
            <button className="playerGuessesBtn guessesBtn inGameBtn"
                onClick={() => 
                    {setShowPlayerPredictions(!showPlayerPredictions);
                      setShowOpponentPredictions(false)  
                    }}>{showPlayerPredictions ? "C" : "P"}
            </button>

            <PowerUps />
            <InGameMenu />
            <Screen />
            <InGameCodeButtons />
        </div>
    )
}

export default GameScene