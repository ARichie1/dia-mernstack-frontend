import React from 'react'
import { useMoveContext } from '../../hooks/useMoveContext'

const Move = () => {
    const { playerGameMove, opponentGameMove} = useMoveContext()
    
    return (
        <div className="timeWrapper">
            {playerGameMove}
        </div>
    )
}

export default Move