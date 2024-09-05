import React, { createContext, useContext, useState } from 'react'
import { GameContext } from './GameContext'
import { InGameContext } from './InGameContext'

export const CodeCreationContext = new createContext()

const CodeCreationContextProvider = (props) => {
    const {isOutGame, codeSelection, setCodeSelection
    }  = useContext(GameContext)
    const {activePrediction, 
        setActivePrediction} = useContext(InGameContext)

    const [codeButtonsObject, setCodeButtonsObject] = useState({
        button0 : {value: "cyber_bully", type: "numBtn", active: false, id: 0},
        button1 : {value: "naval_fireman", type: "numBtn", active: false, id: 1},
        button2 : {value: "naval_chef", type: "numBtn", active: false, id: 2},
        button3 : {value: "xmas_gangster", type: "numBtn", active: false, id: 3},
        button4 : {value: "birthday_zombie", type: "numBtn", active: false, id: 4},
        button5 : {value: "devil_wakanda", type: "numBtn", active: false, id: 5},
        button6 : {value: "paid_tiger", type: "numBtn", active: false, id: 6},
        button7 : {value: "paid_wakanda", type: "numBtn", active: false, id: 7},
        button8 : {value: "savage_vikings", type: "numBtn", active: false, id: 8},
        button10 : {value: "reset", type: "numBtnReset", active: false, id: 10},
        button9 : {value: "red_indian", type: "numBtn", active: false, id: 9}
    })

    const getCodeButtons = () => {
        let buttonsArray = []
        for (const buttonKey in codeButtonsObject) {
            if (Object.prototype.hasOwnProperty.call(codeButtonsObject, buttonKey)) {
                const button = codeButtonsObject[buttonKey];
                buttonsArray = [...buttonsArray, button]
            }
        }
        return buttonsArray
    }

    const resetCodeButtons = () => {
        for (const buttonKey in codeButtonsObject) {
            if (Object.prototype.hasOwnProperty.call(codeButtonsObject, buttonKey)) {
                const button = codeButtonsObject[buttonKey];
                button.active = false
            }
        }
    }
    
    const handleCodeButton = (value, id) => {
        if (codeButtonsObject[`button${id}`].active){
            let trimmedCodeSelection = 
            isOutGame ? codeSelection.filter(code => code.id !== id)
            : activePrediction.filter(code => code.id !== id)

            isOutGame ? 
            setCodeSelection(trimmedCodeSelection) 
            : setActivePrediction(trimmedCodeSelection)

            codeButtonsObject[`button${id}`].active = false
        }else {
            isOutGame ? setCodeSelection([...codeSelection,
                {value, btn_id: id, id}])
            : setActivePrediction([...activePrediction,
                {value, btn_id: id, id}])

            codeButtonsObject[`button${id}`].active = true
        }
    }

    const handleCodeReset = () => {
        isOutGame ? 
            setCodeSelection([]) 
            : setActivePrediction([])

        resetCodeButtons()
    }

    let codeButtons = getCodeButtons()
    
    return (
        <CodeCreationContext.Provider value={{
            codeButtons,
            getCodeButtons, resetCodeButtons,
            handleCodeButton, handleCodeReset
        }}>
            {props.children}
        </CodeCreationContext.Provider>
    )
}

export default CodeCreationContextProvider