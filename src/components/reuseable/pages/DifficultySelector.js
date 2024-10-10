import React, { useContext, useState } from "react";
import { GameContext } from "../../../contexts/GameContext";
import socketInService from "../../../hooks/connections/socketService";
import socketGameService from "../../../hooks/connections/gameService";


const DifficultySelector = ({otherActions}) => {
    const { Difficulties, insertDifficulty, 
            chosenDifficulty, isHost,
            gameProperties, setGameProperties} = useContext(GameContext)

    const sendGameProperties = async () => {
        const socket = socketInService.socket
        let saved = socketGameService.saveGameProperties(socket, gameProperties)
    }

    const saveGameProperties = () => {
        if (isHost) {
            sendGameProperties()
        }
        otherActions()
    }

    const difficultyList = Difficulties.map( diff => {

        const runOtherActions = () => {
            if (otherActions){otherActions()}
            else{return}
        }

        return (
            <div className={`${diff.difficulty} difficulty`} 
                style={{background: diff.color}} 
                onClick={() => {
                    
                    // Set the chosen difficulty for the game context
                    insertDifficulty(diff);
                    setGameProperties({
                        difficulty : diff
                    })

                    // If in single player mode, 
                    // toggle the difficulty selector
                    if(!isHost){runOtherActions()} 
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
                <button className="saveGameProperties clkBtn"
                    onClick={() => saveGameProperties()}>
                    Save
                </button>
            </div>
    )
}

export default DifficultySelector