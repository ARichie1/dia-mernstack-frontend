import React, { useContext } from "react";
import { GameContext } from "../../../contexts/GameContext";


const DifficultySelector = ({ insertDifficulty }) => {
    const { Difficulties } = useContext(GameContext)

    const difficultyList = Difficulties.map( diff => {
        return (
            <div className={`${diff.difficulty} difficulty`} 
                style={{background: diff.color}} 
                onClick={() => insertDifficulty(diff)}
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
            </div>
    )
}

export default DifficultySelector