import React from "react";
import { useInGameContext } from "../../../hooks/useInGameContext";
import { useGameContext } from "../../../hooks/useGameContext";
import CodeAndResult from "../../ingame/CodeAndResult";
import { useNavigate } from "react-router-dom";


const OutComePopUp = () => {
    const navigate = useNavigate()

    const {gameMode, isFindAgentsMode, 
        isStoryMode, isSurvivalMode} = useGameContext()
        
    const {gameTime, gameMoves, 
        currentPrediction, isOutOfMove,
        showOutcomePopUp, setshowOutcomePopUp,
    } = useInGameContext()
                                                                                                                

    return (
        <div className="outcomeWrapper">
            <div className="outcomeModal">
                <div className='theMessage'><h1></h1></div>
                <div className='theExtraMessage'><h3></h3></div>
                <div className="theMessageGraphics"></div>
                <div className='theCombination'>
                    <CodeAndResult carAttr={
                    {prediction: currentPrediction,
                        type: "codesandresults",
                        showResult: false,
                        class:"currentPredictionWrapper"
                    }}/>
                </div>
                <div className="outcomeButtons">
                    <div className='outcomeBtn menu'
                    onClick={() => navigate("/")}>Menu</div>

                    {isOutOfMove && <div className='outcomeBtn saveMe'>Save Me</div>}
                    <div className='outcomeBtn tryAgain'>Try Again</div>
                    {isStoryMode && <div className='outcomeBtn next'>Next</div>}
                    {isSurvivalMode && <div className='outcomeBtn next'>Next Stage</div>}
                </div>
                <div className="hideOutcome" onClick={() => setshowOutcomePopUp(!showOutcomePopUp)}>X</div>
            </div>
        </div>
    )
}

export default OutComePopUp

 