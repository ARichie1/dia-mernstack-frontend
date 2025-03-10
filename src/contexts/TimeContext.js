import React, { createContext, useState } from 'react'
import { useGameContext } from '../hooks/useGameContext'
import { useOutcomeContext } from '../hooks/useOutcomeContext'
import TimeService from '../hooks/deadlines/timeService'

export const TimeContext = new createContext()

const TimeContextProvider = (props) => {
    
    const {chosenDifficulty} = useGameContext()
    const {setAndShowOutcomePopUp} = useOutcomeContext()

    const [playerCurrentMinutes, setPlayerCurrentMinutes] = useState(0) 
    const [playerCurrentSeconds, setPlayerCurrentSeconds] = useState(0)
    const [playerGameTime, setPlayerGameTime] = useState("0:00") 
    const [isPlayerTimeUp, setIsPlayerTimeUp] = useState(false) 
    
    const [opponentCurrentMinutes, setOpponentCurrentMinutes] = useState(0) 
    const [opponentCurrentSeconds, setOpponentCurrentSeconds] = useState(0)
    const [opponentGameTime, setOpponentGameTime] = useState("0:00") 
    const [isOpponentTimeUp, setIsOpponentTimeUp] = useState(false) 

    const playerTimeService = new TimeService(setPlayerGameTime, 
        setPlayerCurrentMinutes, setPlayerCurrentSeconds, 
        setIsPlayerTimeUp, chosenDifficulty.time, setAndShowOutcomePopUp)

    const opponentTimeService = new TimeService(setOpponentGameTime, 
        setOpponentCurrentMinutes, setOpponentCurrentSeconds, 
        setIsOpponentTimeUp, chosenDifficulty.time, setAndShowOutcomePopUp)

    return (
        <TimeContext.Provider value={{
            playerTimeService, opponentTimeService,

            playerCurrentMinutes, setPlayerCurrentMinutes, 
            playerCurrentSeconds, setPlayerCurrentSeconds,
            playerGameTime, setPlayerGameTime, 
            isPlayerTimeUp, setIsPlayerTimeUp, 

            opponentCurrentMinutes, setOpponentCurrentMinutes, 
            opponentCurrentSeconds, setOpponentCurrentSeconds,
            opponentGameTime, setOpponentGameTime, 
            isOpponentTimeUp, setIsOpponentTimeUp
        }}>
            {props.children}
        </TimeContext.Provider>
    )
}

export default TimeContextProvider