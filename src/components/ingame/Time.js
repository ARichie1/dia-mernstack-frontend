import React from 'react'
import { useTimeContext } from '../../hooks/useTimeContext'

const Time = () => {

    const {gameTime} = useTimeContext()

    return (
        <div className="timeWrapper">
            {gameTime}
        </div>
    )
}

export default Time