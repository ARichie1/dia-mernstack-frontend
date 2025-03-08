import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { InGameContext } from '../../contexts/InGameContext'
import { CodeCreationContext } from '../../contexts/CodeCreationContext'
import { useTimeContext } from '../../hooks/useTimeContext'
import { useMoveContext } from '../../hooks/useMoveContext'

const InGameCodeButtons = () => {
    const {
        chosenDifficulty,
        isTimeCountDownEnabled, isMoveCountDownEnabled, 
        gameType, isInGame, isOutGame,
        isTurn, setIsTurn,
        showPlayBtn, showSaveBtn, showSendBtn,
        handlePlayBtn, handleSaveBtn, handleSendBtn, 
        codeSelection
    }  = useContext(GameContext)

    const { initiateTimeCount, pauseTime} = useTimeContext()
    const { initiateMoveCount, pauseMove} = useMoveContext()

    const {activePrediction, 
        recieveOpponentAPandCP, setShowOpponentScreen,
        sendValidActivePrediction} = useContext(InGameContext)
    const {codeButtons,handleCodeButton, handleCodeReset} = useContext(CodeCreationContext)

    // If In Multiplayer Mode
    // Initiate Recieveing oppenents AP and CP 
    // If Player Is Not Player Turn To Play (isTurn = false)
    const initiateRecievingOpponentAPandCP = () => {
        
       if (isTimeCountDownEnabled) {
            initiateTimeCount(chosenDifficulty.time ? chosenDifficulty.time : 0)
        }
        if (isMoveCountDownEnabled) {
            initiateMoveCount(chosenDifficulty.moves ? chosenDifficulty.moves : 0)
        }

        if (!isTurn) {
            if (isTimeCountDownEnabled) {pauseTime()}
            if (isMoveCountDownEnabled) {pauseMove()}
        }

        recieveOpponentAPandCP()

        if (!isTurn) {
            setShowOpponentScreen(true)
        }
    }
    
    let codeButtonList = codeButtons.sort((a, b) => a - b).map(cb => {
        return (
            <li key={cb.id}>
                {cb.type === "numBtn" ?  
                    <div className={
                        cb.disabled ? "disabledButton" : "enabledButton"}
                        >✖</div> : null}
                {cb.type === "numBtn" ? 
                    (<button 
                        className={`${cb.type} inGameBtn`} 
                        data-sound={`../sounds/${cb.id}.wav"`} 
                        type="button" key={cb.id}
                        onClick={() => handleCodeButton(cb.value, cb.id)}
                        style={{opacity : `${cb.active ? "1" : "0.2"}`}}
                        disabled={isOutGame ? false : (isTurn ? false : true)}>
                        <img id={`_${cb.id}_`} src={`../../../assets/images/faces/pa_${cb.value}.png`} alt={`pa_${cb.value}.png`}/>
                    </button>) : (
                    <button 
                        className={`${cb.type} inGameBtn`} 
                        data-sound={`../sounds/${cb.id}.wav"`} 
                        type="button" key={cb.id}
                        onClick={() => handleCodeReset()}
                        disabled={isOutGame ? false : (isTurn ? false : true)}>
                        <p>{cb.value}</p>
                    </button>)
                }
            </li>
        )
    })

    return (
        <div className="codedImages bottomContents">
            <ul className="agents">
                {codeButtonList}

                {isInGame && 
                    <li>
                        {showSendBtn && 
                            <div><button 
                                    className={`numBtnSend inGameBtn`} 
                                    data-sound={`../sounds/0.wav`} 
                                    type="button"
                                    onClick={() => {
                                        handleSendBtn(activePrediction)
                                        sendValidActivePrediction()
                                        handleCodeReset()
                                    }}>
                                    <p>Send</p>
                            </button></div>
                        }
                    </li>
                }

                {isOutGame && 
                    <li>
                        <ul>
                            {showSaveBtn && 
                            <li><button 
                                className={`numBtnSave inGameBtn`} 
                                data-sound={`../sounds/0.wav`} 
                                type="button"
                                onClick={() => handleSaveBtn(codeSelection)}>
                                <p>Save</p>
                            </button></li>}
                            
                            {showPlayBtn && 
                                <li><button 
                                    className={`numBtnPlay inGameBtn`} 
                                    data-sound={`../sounds/0.wav`} 
                                    type="button"
                                    onClick={() => {
                                        handlePlayBtn()
                                        handleCodeReset()
                                        initiateRecievingOpponentAPandCP()
                                    }}>
                                    <p>Play</p>
                                </button></li>}
                        </ul>
                    </li>
                }
            </ul>
        </div>
    )
}

export default InGameCodeButtons