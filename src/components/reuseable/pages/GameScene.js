import React, { useContext, useState } from "react";
import Screen from "../../ingame/Screen";
import PowerUps from "../../ingame/PowerUps";
import InGameMenu from "../../ingame/InGameMenu";
import InGameCodeButtons from "../../ingame/InGameCodeButtons";
import { GameContext } from "../../../contexts/GameContext";

const GameScene = () => {
    const [showOpponentPredictions, setShowOpponentPredictions] = useState(false)
    const [showPlayerPredictions, setShowPlayerPredictions] = useState(false)
    
    return (
        <div className="inGame">
            <div className="opponentGuessesBtn guessesBtn inGameBtn"
                onClick={() => 
                    {setShowOpponentPredictions(!showOpponentPredictions);
                        setShowPlayerPredictions(false)
                    }}>{showOpponentPredictions ? "C" : "O"}
            </div>
            <div className="playerGuessesBtn guessesBtn inGameBtn"
                onClick={() => 
                    {setShowPlayerPredictions(!showPlayerPredictions);
                      setShowOpponentPredictions(false)  
                    }}>{showPlayerPredictions ? "C" : "P"}
            </div>

            <PowerUps />
            <InGameMenu />
            <Screen 
                showOpponentPredictions={showOpponentPredictions}
                showPlayerPredictions={showPlayerPredictions}/>
            <InGameCodeButtons />
        </div>
    )
}

export default GameScene