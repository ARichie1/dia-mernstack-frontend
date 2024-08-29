import React, { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";

const StoryModePage = () => {
    const { Difficulties } = useContext(GameContext)

    let difficulties = Difficulties

    const levels = [
        2, 2, 2, 2, 2, 2, 2, 2, 
        3, 3, 3, 3, 3, 3, 3, 3, 3, 
        4, 4, 4, 4, 4, 4, 4, 4, 4, 
        5, 5, 5, 5, 5, 5, 5, 5, 5, 
        6, 6, 6, 6, 6, 6, 6, 6, 6,
        7
    ]
    let totalStage = 5
    let levelsPerStage = levels.length / totalStage

    let levelsObject = []

    for (let i = 0; i < levels.length; i++) {
        if (levels[i] === 2) {
            levelsObject[i] = {...difficulties[1], id : i + 1}
        } else if (levels[i] === 3){
            levelsObject[i] = {...difficulties[2], id : i + 1}
        } else if (levels[i] === 4){
            levelsObject[i] = {...difficulties[3], id : i + 1}
        } else if (levels[i] === 5){
            levelsObject[i] = {...difficulties[4], id : i + 1}
        } else if (levels[i] === 6){
            levelsObject[i] = {...difficulties[5], id : i + 1}
        } else {
            levelsObject[i] = {difficulty : "brainfuck", agents : 7, time: null, moves: null, color: "white", id: levels.length}
        }
    }

    let stages = {}
    const createStages = (min, max) => {
        for (let i = 0; i < totalStage; i++) {
            stages[`stage${i+1}`] = []  
            for (let j = min; j < max; j++) { 
                if (levelsObject[j].id > min && levelsObject[j].id <= max) {
                    stages[`stage${i+1}`] =  [...stages[`stage${i+1}`], levelsObject[j]]   
                }
            } 
                min = max 
                max = max + levelsPerStage     
        }
    }

    let stagesLvl = {}
    const createStagesLevels = (min, max) => {
        for (let i = 0; i < totalStage; i++) {
            stagesLvl[`stage${i+1}Lvl`]= []
            stagesLvl[`stage${i+1}Lvl`] = stages[`stage${i+1}`].map( lvl => {
                return (
                    <div className="level toGame" id="singlePlayerMainGame" style={{background: lvl.color}} key={lvl.id}>{lvl.id}</div>                     
                )
            })
        }
    }

    let stagesToRender = []
    const renderStages = () => {
        let leftPosition = 0;
        for (let i = 0; i < totalStage; i++) {
            stagesToRender[i] = []
            stagesToRender[i] = [...stagesToRender[i], 
            <div className={`stage${i+1}Lvl stage`} style={{left: `${leftPosition}%`}} key={i+1}>
                <div className="levelGrid">            
                    {stagesLvl[`stage${i+1}Lvl`]}                  
                </div>
            </div>]
            leftPosition += 100
        }
        return stagesToRender
    } 

    createStages(0, levelsPerStage)
    createStagesLevels()
    const stageList = renderStages()

    return (
        <div className="storyMode wrapper">
            <h5>TERMINATE ENEMY SPIES ACROSS THE WORLD</h5>
            <div className="stages">
                {stageList}
            </div>
        </div>
    )
}

export default StoryModePage