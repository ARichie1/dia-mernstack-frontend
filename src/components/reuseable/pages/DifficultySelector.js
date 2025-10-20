import React, { useContext, useEffect, useState } from "react";
import { useGameContext } from "../../../hooks/useGameContext";
import socketInService from "../../../hooks/connections/socketService";
import socketGameService from "../../../hooks/connections/gameService";
import { useNavigate } from "react-router-dom";
import Switch from "../controls/Switch";


const DifficultySelector = ({otherActions}) => {
    const navigate = useNavigate()

    const { Difficulties, insertDifficulty, chosenDifficulty,
            setHasSelectedDifficulty,
            setIsEndlessMode, gameType, gameMode, isMultiplayer,
            gameProperties, setGameProperties, isHost, isReady,
            deadlineParameter, setDeadlineParameter,
            hasDeadlineParameter, setHasDeadlineParameter,
            isTimeCountDownEnabled, setIsTimeCountDownEnabled,
            isMoveCountDownEnabled, setIsMoveCountDownEnabled,
            enableDeadlineParameters,  disableDeadlineParameters,
        } = useGameContext()

    const [showEndlessDiffList, setShowEndlessDiffList] = useState(false)
    const [showDeadlineSettings, setShowDeadlineSettings] = useState(false)

    // Properties On Deadline Switchces
    const switchesAttr = [
        { title: "", parent: "time", 
            classes: "deadlineSwitch timeSwitches", 
            state: isTimeCountDownEnabled, 
            action: [setIsTimeCountDownEnabled],
            id: 1},
        { title: "", parent: "move", 
            classes: "deadlineSwitch moveSwitches", 
            state: isMoveCountDownEnabled, 
            action: [setIsMoveCountDownEnabled],
            id: 2}
    ]
    
    // Updates the Game Props Based on Deadline Params State
    const setGamePropBasedOnDeadlineParams = (diff) => {
        insertDifficulty(diff);
        setGameProperties({
            type: gameType, mode: gameMode,
            multiplayer: isMultiplayer,
            difficulty: diff,
            isTimeCountDownEnabled: isTimeCountDownEnabled,
            isMoveCountDownEnabled: isMoveCountDownEnabled
        })

         console.log('isTimeCountDownEnabled : ', isTimeCountDownEnabled);
         console.log('isMoveCountDownEnabled : ', isMoveCountDownEnabled);
         
    }

    // Track the Deadline Params State and 
    // Update the Game Props Based on dlps state
    useEffect(() => {
        console.log("tcd : ", isTimeCountDownEnabled);
        console.log("MCd : ", isMoveCountDownEnabled);

        if (!isTimeCountDownEnabled && !isMoveCountDownEnabled) {
            setGamePropBasedOnDeadlineParams({difficulty : "endless", agents : 2, time: null, moves: null, saveMeTime: null, saveMeMoves: null, color: "var(--themeColor)", id: 1})  
            setIsEndlessMode(true)
            setHasDeadlineParameter(false)
        }else{
            setGamePropBasedOnDeadlineParams(Difficulties[1])  
            setIsEndlessMode(false)
            setHasDeadlineParameter(true) 
        }
    }, [isTimeCountDownEnabled, isMoveCountDownEnabled])

    // Helps highlights the selected difficulty
    const styleSelected = (diff) => {
        let styleArray = {}
        if (diff.difficulty !== "endless"){
            if(chosenDifficulty.difficulty === diff.difficulty){
                styleArray = {
                    background: diff.color, 
                    transform: "scale(1.1)", 
                    boxShadow: "var(--shadow)"}            
            }else{
                styleArray = {
                    background: diff.color,
                    transform: "scale(1.05)", boxShadow: "none"}                  
            }
        }
        return styleArray
    }

    // SOCKET IO - send game properties to server
    const sendGameProperties = async () => {
        const socket = socketInService.socket
        let saved = await socketGameService.saveGameProperties(socket, 
            {
                type: gameType, mode: gameMode,
                multiplayer: isMultiplayer,
                difficulty : chosenDifficulty,               
                isTimeCountDownEnabled: isTimeCountDownEnabled,
                isMoveCountDownEnabled: isMoveCountDownEnabled
            }, 
            isReady)
        .then( ({saved}) => {
            console.log("saved");
        })
    }

    // Save the game properties when in single game mode
    // or a host in multiplayer mode
    const saveGameProperties = () => {
        if (gameType === "single-player") {
            sendGameProperties()
        }
        if (isHost) {sendGameProperties()}
        // otherActions()
    }

    // Generate a list of available and valid difficulties
    const difficultyList = Difficulties.filter( diff => diff.difficulty !== "endless"
    ).map( diff => {
        return (
            <div className={`${diff.difficulty} difficulty`} 
                
                style={styleSelected(diff)}
                onClick={() => { 
                    // Set the chosen difficulty for the game context
                    if (diff.difficulty !== "endless") {
                        insertDifficulty(diff);
                        setGameProperties({
                            type: gameType, mode: gameMode,
                            multiplayer: isMultiplayer,
                            difficulty : diff,
                            isTimeCountDownEnabled: isTimeCountDownEnabled,
                            isMoveCountDownEnabled: isMoveCountDownEnabled
                        })
                        setIsEndlessMode(false)
                        if (!hasDeadlineParameter) {
                            setShowDeadlineSettings(true)
                            setHasSelectedDifficulty(false)
                        }
                    }
                }}
                key={diff.id}>  
                <div className="difficultyHeader" key={Math.random()}>{diff.difficulty}</div>
                <div className="agentsAvailable" key={Math.random()}>{diff.agents}</div>
                <div className="timeAvailable" key={Math.random()}>{diff.time}</div>
                <div className="movesAvailable" key={Math.random()}>{diff.moves}</div>
            </div>
        )
    })
    
    let endlessDifficultyList = Difficulties.filter( diff => 
        diff.difficulty !== "endless"
    );

    endlessDifficultyList = endlessDifficultyList.map( diff => {
        return (
            <li 
                onClick={() => {
                    setShowEndlessDiffList(false)

                    insertDifficulty(
                        {difficulty : "endless", agents : diff.agents, time: null, moves: null, saveMeTime: null, saveMeMoves: null, color: "var(--themeColor)", id: 1}
                    );

                    setGameProperties({
                        type: gameType, mode: gameMode,
                        multiplayer: isMultiplayer,
                        difficulty : {difficulty : "endless", agents : diff.agents, time: null, moves: null, saveMeTime: null, saveMeMoves: null, color: "var(--themeColor)", id: 1},               
                        isTimeCountDownEnabled: isTimeCountDownEnabled,
                        isMoveCountDownEnabled: isMoveCountDownEnabled
                    })
                    setIsEndlessMode(true)
                    disableDeadlineParameters()
                }}
                key={diff.agents}>{diff.agents}</li>
        )
    })

    return (
            <div className="difficultyTable">
                <div className="headInfo" key={0}>
                    <div className="difficultyHeader">DIFFICULTY</div>
                    <div className="agentsAvailable">AGENTS</div>
                    <div className="timeAvailable">TIME(s)</div>
                    <div className="movesAvailable">MOVES</div>
                    <div className="deadlineSettingBtn" onClick={() => setShowDeadlineSettings(!showDeadlineSettings)}>⚙</div>
                </div>

                {showDeadlineSettings && <div className="chooseDeadline difficulty">
                    <div className="deadlineSettingsHeader"><h4>Set Countdown</h4></div>
                    <div className="deadlinesWrapper">
                        <p>&#128336; Enable Time Count Down</p>
                        <div className="timeAvailable deadlinesSwitchWrapper timeDeadline">
                            <Switch switchAttr={switchesAttr[0]}/>
                        </div>
                    </div>
                    <div className="deadlinesWrapper">
                        <p>&#9823; Enable Move Count Down</p>
                        <div className="deadlinesSwitchWrapper moveDeadline">
                            <Switch switchAttr={switchesAttr[1]}/>
                        </div>
                    </div>
                    <div className="saveDeadlineSettingsBtn">
                        <button className="clkBtn" onClick={() => 
                            {
                                setShowDeadlineSettings(!showDeadlineSettings)
                                setGameProperties({
                                type: gameType, mode: gameMode,
                                multiplayer: isMultiplayer,
                                difficulty : chosenDifficulty,
                                isTimeCountDownEnabled: isTimeCountDownEnabled,
                                isMoveCountDownEnabled: isMoveCountDownEnabled
                                })
                            }
                        }>Save</button>
                    </div>
                </div>}

                <div className="endlessMode difficulty"
                    style={chosenDifficulty.difficulty === "endless" ? {transform: "scale(1.1)", boxShadow: "var(--shadow)", zIndex: 9} : {transform: "scale(1.05)", boxShadow: "none", zIndex: 9}}>                    
                    
                    <div className="difficultyHeader">Endless</div>
                    <div className="agentsAvailable">
                        <p className="clkBtn" onClick={() => setShowEndlessDiffList(!showEndlessDiffList)}>
                            Select Agents 
                        </p>
                        <div className="selectedEndlessAgent">{chosenDifficulty.agents}</div>
                        {showEndlessDiffList && <ul className="endlessDiffWrapper">
                            {endlessDifficultyList}
                        </ul>}
                    </div>
                    <div className="timeAvailable">-</div>
                    <div className="movesAvailable">-</div>
                </div>

                {difficultyList}
                
                {gameType === "multiplayer" ?
                    <button className="saveGameProperties clkBtn"
                        onClick={() => saveGameProperties()}>
                        Save
                    </button> : <p></p>
                }
            </div>
    )
}

export default DifficultySelector