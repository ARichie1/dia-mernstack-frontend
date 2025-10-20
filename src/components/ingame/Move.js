import React from 'react'
import { useMoveContext } from '../../hooks/useMoveContext'

const Move = ({isOpponent}) => {
    const { playerGameMove, opponentGameMove} = useMoveContext()
    
    return (
        <div className="timeWrapper">
            {isOpponent ? opponentGameMove : playerGameMove}
        </div>
    )
}

export default Move