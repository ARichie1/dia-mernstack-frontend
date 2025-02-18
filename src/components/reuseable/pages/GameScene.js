import React, { useContext, useEffect, useState } from "react";
import Screen from "../../ingame/Screen";
import PowerUps from "../../ingame/PowerUps";
import InGameMenu from "../../ingame/InGameMenu";
import InGameCodeButtons from "../../ingame/InGameCodeButtons";
import { useGameContext } from "../../../hooks/useGameContext";
import { useInGameContext } from "../../../hooks/useInGameContext";

const GameScene = () => {

    const {gameType} = useGameContext()

    const {showPlayerPredictions, setShowPlayerPredictions,
        showOpponentPredictions, setShowOpponentPredictions,
        } = useInGameContext()

    return (
        <div className="inGame">
            <button className="opponentGuessesBtn guessesBtn inGameBtn"
                onClick={() => 
                    {setShowOpponentPredictions(!showOpponentPredictions);
                        setShowPlayerPredictions(false)
                    }}>{showOpponentPredictions ? "C" : "O"}
            </button>
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