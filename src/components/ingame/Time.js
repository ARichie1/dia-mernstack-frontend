import React from 'react'
import { useTimeContext } from '../../hooks/useTimeContext'

const Time = () => {
    const {playerGameTime, opponentGameTime} = useTimeContext()

    return (
        <div className="timeWrapper">
            {playerGameTime}
        </div>
    )
}

export default Time