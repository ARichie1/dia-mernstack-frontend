import React, { useContext, useState } from 'react'
import { GameContext } from '../../contexts/GameContext'
import { InGameContext } from '../../contexts/InGameContext'
import { useNavigate } from 'react-router-dom'

const InGameCodeButtons = () => {

    const navigate = useNavigate()

    const {
        isInGame, isOutGame,
        showPlayBtn, showSaveBtn, showSendBtn,
        handlePlayBtn, handleSaveBtn,
        codeSelection, setCodeSelection
    }  = useContext(GameContext)

    const {activePrediction, setActivePrediction} = useContext(InGameContext)

    const codeButtons = [
        {value: "cyber_bully", type: "numBtn",id: 0},
        {value: "naval_fireman", type: "numBtn",id: 1},
        {value: "naval_chef", type: "numBtn",id: 2},
        {value: "xmas_gangster", type: "numBtn",id: 3},
        {value: "birthday_zombie", type: "numBtn",id: 4},
        {value: "devil_wakanda", type: "numBtn",id: 5},
        {value: "paid_tiger", type: "numBtn",id: 6},
        {value: "paid_wakanda", type: "numBtn",id: 7},
        {value: "savage_vikings", type: "numBtn",id: 8},
        {value: "reset", type: "numBtnReset", id: 10},
        {value: "red_indian", type: "numBtn",id: 9}
    ]

    const handleCodeButton = (value, id) => {
        if (isInGame) {
            setActivePrediction([...activePrediction,
                {value, btn_id: id, id}])
            console.log(activePrediction);
            
        }
        else if(isOutGame){
            setCodeSelection([...codeSelection,
                {value, btn_id: id, id}])
            console.log(codeSelection);
            
        }
    }

    let codeButtonList = codeButtons.map(cb => {
        return (
            <li key={cb.id}>
            <button 
                className={`${cb.type} inGameBtn`} 
                data-sound={`../sounds/${cb.id}.wav"`} 
                type="button" key={cb.id}
                onClick={() => handleCodeButton(cb.value, cb.id)}>
                {cb.type === "numBtn" ? <img id={`_${cb.id}_`} src={`../../../assets/images/faces/pa_${cb.value}.png`} alt={`pa_${cb.value}.png`}/> : <p>{cb.value}</p>}
            </button></li>
        )
    })

    const moveToInGame = () => {
        navigate("/game/in-game/single-player/:userid")
    }

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
                                    type="button">
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
                                onClick={() => handleSaveBtn()}>
                                <p>Save</p>
                            </button></li>}
                            
                            {showPlayBtn && 
                                <li><button 
                                    className={`numBtnPlay inGameBtn`} 
                                    data-sound={`../sounds/0.wav`} 
                                    type="button"
                                    onClick={() => {
                                        handlePlayBtn();
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