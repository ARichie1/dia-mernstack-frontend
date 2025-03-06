import React, { createContext, useState } from 'react'
import { useGameContext } from '../hooks/useGameContext'
import { useOutcomeContext } from '../hooks/useOutcomeContext'

export const MoveContext = new createContext()

const MoveContextProvider = (props) => {
    
    const {chosenDifficulty} = useGameContext()
        
    const {setAndShowOutcomePopUp} = useOutcomeContext()

    const [gameMove, setGameMove] = useState(0) 
    const [canReduceMove, setCanReduceMove] = useState(false)

    // THE MOVES CORE START
    // Initiate  Count
    const initiateMoveCount = (initialMove) => {
        setGameMove(initialMove);
        setCanReduceMove(true)
    }

    // Add Moves
    const addMove = (moveAmount) => {
        setGameMove(gameMove + moveAmount)
    }

    // Decrease Moves
    const reduceMove = (moveAmount) => {
        if (canReduceMove) {
        // If the last move is used and no more move(moves = 0)
            if (gameMove === 1) {
                setGameMove(0)
            // Send the outcome
                setAndShowOutcomePopUp("outofmoves");
            }else if (gameMove > moveAmount) {
                setGameMove(gameMove - moveAmount)
            }
        }
    }

    // Pause Move Count
    let pauseMoveTimeOut
    const pauseMove = (time) => {

        // Move reduction has been paused already,
        // and a resume time was passed before,
        // stop that resume time
        if (!canReduceMove) {
            if (pauseMoveTimeOut) {
                clearTimeout(pauseMoveTimeOut)
            }
        }

        // Then stop move reduction
        setCanReduceMove(false)
        
        // If a resume time is specified,
        // after the passed time(seconds) enable move reduction 
        if (time) {
            pauseMoveTimeOut = setTimeout(() => {
                setCanReduceMove(true)
            }, time);
        }
    }

    // Resume Move Count
    const resumeMove = (time) => {setCanReduceMove(true)}
    
    // Reset Moves
    const resetMove = (resetTo) => {
        initiateMoveCount(resetTo ? resetTo : chosenDifficulty.moves)
    }

    return (
        <MoveContext.Provider value={{
            gameMove, setGameMove,
            initiateMoveCount, addMove, reduceMove, 
            pauseMove, resumeMove, resetMove
        }}>
            {props.children}
        </MoveContext.Provider>
    )
}

export default MoveContextProvider