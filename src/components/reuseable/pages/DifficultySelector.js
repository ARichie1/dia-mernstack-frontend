import React, { useContext, useState } from "react";
import { useGameContext } from "../../../hooks/useGameContext";
import socketInService from "../../../hooks/connections/socketService";
import socketGameService from "../../../hooks/connections/gameService";
import { useNavigate } from "react-router-dom";


const DifficultySelector = ({otherActions}) => {
    const navigate = useNavigate()

    const { Difficulties, insertDifficulty, chosenDifficulty, 
            setIsEndlessMode, gameType, gameMode, isMultiplayer,
            gameProperties, setGameProperties,
            isHost, isReady,
            } = useGameContext()

    const [showEndlessDiffList, setShowEndlessDiffList] = useState(false)
    const [hasSelectedDiff, setHasSelectedDiff] = useState(false)

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
        let saved = await socketGameService.saveGameProperties(socket, gameProperties, isReady)
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
                            difficulty : diff
                        })
                        setIsEndlessMode(false)
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
                        difficulty : {difficulty : "endless", agents : diff.agents, time: null, moves: null, saveMeTime: null, saveMeMoves: null, color: "var(--themeColor)", id: 1} 
                    })

                    setIsEndlessMode(true)
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
                </div>

                <div className="endlessMode difficulty"
                    style={chosenDifficulty.difficulty === "endless" ? {transform: "scale(1.1)", boxShadow: "var(--shadow)", zIndex: 9} : {transform: "scale(1.05)", boxShadow: "none", zIndex: 9}}>                    
                    
                    <div className="difficultyHeader">Endless</div>
                    <div className="agentsAvailable">
                        <p onClick={() => setShowEndlessDiffList(!showEndlessDiffList)}>
                            Select Agents 
                        </p>
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