import React from 'react'
import { useMoveContext } from '../../hooks/useMoveContext'

const Move = () => {

    const { gameMove, initiateMoveCount, addMove, reduceMove, 
            pauseMove, resumeMove, resetMove} = useMoveContext()

    return (
        <div className="timeWrapper">
            {gameMove}
        </div>
    )
}

export default Move