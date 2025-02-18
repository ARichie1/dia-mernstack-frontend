import React, { useContext, useState } from "react";
import { useGameContext } from "../../../hooks/useGameContext";
import socketInService from "../../../hooks/connections/socketService";
import socketGameService from "../../../hooks/connections/gameService";
import { useNavigate } from "react-router-dom";


const DifficultySelector = ({otherActions}) => {
    const navigate = useNavigate()

    const { Difficulties, insertDifficulty, chosenDifficulty, 
            gameType, gameMode,
            gameProperties, setGameProperties,
            isHost, isReady,
            } = useGameContext()

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
    const difficultyList = Difficulties.map( diff => {
        return (
            <div className={`${diff.difficulty} difficulty`} 
                style={{background: diff.color}} 
                onClick={() => {
                    
                    // Set the chosen difficulty for the game context
                    insertDifficulty(diff);
                    setGameProperties({
                        type: gameType, mode: gameMode,
                        difficulty : diff
                    })
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
            <option key={diff.agents}>{diff.agents}</option>
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
                {difficultyList}
                <select>
                    <option> Select Agents </option>
                    {endlessDifficultyList}
                </select>
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