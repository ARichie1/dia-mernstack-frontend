import React from "react";
import { useInGameContext } from "../../../hooks/useInGameContext";
import { useGameContext } from "../../../hooks/useGameContext";
import CodeAndResult from "../../ingame/CodeAndResult";
import { useNavigate } from "react-router-dom";
import { useOutcomeContext } from "../../../hooks/useOutcomeContext";
import { useTimeContext } from "../../../hooks/useTimeContext";
import { useMoveContext } from "../../../hooks/useMoveContext";


const OutComePopUp = () => {
    const navigate = useNavigate()
        
    const { chosenDifficulty } = useGameContext()
    
    const {currentPrediction} = useInGameContext()

    const {clearAndHideOutcomePopUp, isExitGame, outcomeInfo,
        isCodeCracked, showSaveMeBtn, setShowSaveMeBtn,
        canSaveMe, setCanSaveMe,
        showNextBtn, showTryAgainBtn, showMenuBtn
    } = useOutcomeContext()

    const { addTime } = useTimeContext()
    const { addMove } = useMoveContext()

    const activateSaveMe = () => {
        if (canSaveMe) {
            addTime(chosenDifficulty.saveMeTime)
            addMove(chosenDifficulty.saveMeMoves)

            setCanSaveMe(false)
            setShowSaveMeBtn(false)
        }
        clearAndHideOutcomePopUp()
    }

    return (
        <div className="outcomeWrapper">
            <div className="outcomeModal">
                <div className="outcomeInfo">
                    <div className='theTitle'><h4>{outcomeInfo ? outcomeInfo.title : "" }</h4></div>
                    <div className='theMessage'><p>{outcomeInfo ? outcomeInfo.message : "" }</p></div>
                    <div className="theImage">&#128406;</div>
                </div>

                {isCodeCracked && <div className='theCombination'>
                    <CodeAndResult carAttr={
                    {prediction: currentPrediction,
                        type: "codesandresults",
                        showResult: false,
                        class:"currentPredictionWrapper"
                    }}/>
                </div>}

                <div className="outcomeButtons">
                    {showMenuBtn && <div className='outcomeBtn menu'
                        onClick={() => navigate("/")}>Menu</div>}

                    {isExitGame && <div className='outcomeBtn exit-yes'
                        onClick={() => navigate("/")}>Yes</div>}
                    {isExitGame && <div className='outcomeBtn exit-no'
                        onClick={() => navigate("/")}>No</div>}

                    {showSaveMeBtn && <div className='outcomeBtn saveMe' onClick={
                        () => activateSaveMe()}>Save Me</div>}

                    {showTryAgainBtn && <div className='outcomeBtn tryAgain'>Try Again</div>}
                    {showNextBtn && <div className='outcomeBtn next'>Next</div>}
                </div>
                <div className="hideOutcome" onClick={() => clearAndHideOutcomePopUp()}>X</div>
            </div>
        </div>
    )
}

export default OutComePopUp

 