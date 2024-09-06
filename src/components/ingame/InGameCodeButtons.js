import React, { useContext, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { InGameContext } from '../../contexts/InGameContext'
import { useNavigate } from 'react-router-dom'
import { CodeCreationContext } from '../../contexts/CodeCreationContext'

const InGameCodeButtons = () => {

    const navigate = useNavigate()

    const {
        isInGame, isOutGame,
        showPlayBtn, showSaveBtn, showSendBtn,
        handlePlayBtn, handleSaveBtn, handleSendBtn, 
        codeSelection
    }  = useContext(GameContext)

    const {activePrediction, sendActivePrediction} = useContext(InGameContext)

    const {codeButtons,handleCodeButton, handleCodeReset} = useContext(CodeCreationContext)

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
                        style={{opacity : `${cb.active ? "1" : "0.2"}`}}>
                        <img id={`_${cb.id}_`} src={`../../../assets/images/faces/pa_${cb.value}.png`} alt={`pa_${cb.value}.png`}/>
                    </button>) : (
                    <button 
                        className={`${cb.type} inGameBtn`} 
                        data-sound={`../sounds/${cb.id}.wav"`} 
                        type="button" key={cb.id}
                        onClick={() => handleCodeReset()}>
                        <p>{cb.value}</p>
                    </button>)
                }
            </li>
        )
    })

    const moveToInGame = () => {navigate("/game/in-game/single-player/:userid")}

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
                                        sendActivePrediction()
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
                                        handlePlayBtn();
                                        handleCodeReset()
                                        moveToInGame()}}>
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