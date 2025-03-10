import React, { createContext, useState } from 'react'
import { useGameContext } from '../hooks/useGameContext'
import { useOutcomeContext } from '../hooks/useOutcomeContext'
import MoveService from '../hooks/deadlines/moveService'

export const MoveContext = new createContext()

const MoveContextProvider = (props) => {
    
    const {chosenDifficulty} = useGameContext()
    const {setAndShowOutcomePopUp} = useOutcomeContext()

    const [playerGameMove, setPlayerGameMove] = useState(0) 
    const [playerMoveCanReduce, setPlayerMoveCanReduce] = useState(false) 
    
    const [opponentGameMove, setOpponentGameMove] = useState(0) 
    const [opponentMoveCanReduce, setOpponentMoveCanReduce] = useState(false) 

    const playerMoveService = new MoveService(setAndShowOutcomePopUp, chosenDifficulty)
    const opponentMoveService = new MoveService(setAndShowOutcomePopUp, chosenDifficulty)

    return (
        <MoveContext.Provider value={{
            playerMoveService, opponentMoveService,

            playerGameMove, setPlayerGameMove,
            playerMoveCanReduce, setPlayerMoveCanReduce,
            
            opponentGameMove, setOpponentGameMove, 
            opponentMoveCanReduce, setOpponentMoveCanReduce
        }}>
            {props.children}
        </MoveContext.Provider>
    )
}

export default MoveContextProvider