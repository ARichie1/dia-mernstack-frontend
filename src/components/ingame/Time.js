import React from 'react'
import { useTimeContext } from '../../hooks/useTimeContext'

const Time = ({isOpponent}) => {
    const {playerGameTime, opponentGameTime} = useTimeContext()

    return (
        <div className="timeWrapper">
            {isOpponent ? opponentGameTime : playerGameTime}
        </div>
    )
}

export default Time