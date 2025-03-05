import React from 'react'
import { useTimeContext } from '../../hooks/useTimeContext'

const Time = ({playerInfo}) => {

    const {gameTime, startTimeFunc, pauseTime, resumeTime,
        addTime, reduceTime} = useTimeContext()

    return (
        <div className="timeWrapper">
            {gameTime}
            <div className="timeFuncWrapper">
                <div className='startTime' 
                    onClick={() => startTimeFunc(0.3)}>st</div>
                <div className='startTime' 
                    onClick={() => pauseTime()}>pt</div>
                <div className='resumeTime' 
                    onClick={() => resumeTime()}>rt</div>
                <div className='resumeTime' 
                    onClick={() => addTime(1)}>at</div>
                <div className='resumeTime' 
                    onClick={() => reduceTime(1)}>rd</div>
            </div>
        </div>
    )
}

export default Time