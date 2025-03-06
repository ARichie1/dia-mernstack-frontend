import React, { createContext, useState } from 'react'
import { useOutcomeContext } from '../hooks/useOutcomeContext'

export const TimeContext = new createContext()

const TimeContextProvider = (props) => {
    
    const {setAndShowOutcomePopUp} = useOutcomeContext()

    const [gameTime, setGameTime] = useState("0:00") 
    const [isTimeUp, setIsTimeUp] = useState(false) 
    const [currentMinutes, setCurrentMinutes] = useState(0) 
    const [currentSeconds, setCurrentSeconds] = useState(0) 

    // THE TIME CORE START
    const startTimer = (duration) => {
        pauseTime()
        setCurrentMinutes(0);
        setCurrentSeconds(0);

        let start = Date.now(), diff, minutes, seconds;

        const timer = () => {
        // GET THE NUMBER OF SECONDS THAT HAVE ELAPSED SINCE
        // startTimer() WAS CALLED.
            diff = duration - (((Date.now() - start) / 1000) | 0);

        // MAKE THE TIME WHOLE NUMBERS,
        // DOES THE SAME JOB AS parseInt TRUNCATES THE FLOAT
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

        // MODIFY THE LOOK IF LESS THAN 10
            minutes = minutes < 10 ? minutes : minutes;
        // PREFIX ZERO TO THE SECONDS IF IT IS LESS THAN 10
        // SO IT LOOKS LIKE A DOUBLE DIGIT NUMBER
            seconds = seconds < 10 ? '0' + seconds : seconds;
        // GET THE CURRENT MINUTES AND SECONDS
            setCurrentMinutes(minutes)
            setCurrentSeconds(seconds)

        // IF THE NO MORE TIME
            if(seconds <= 0 && minutes <= 0){
        // SEND THE OUTCOME
                setIsTimeUp(true)
                pauseTime()
                setAndShowOutcomePopUp("timeup")
            }

        // INSERT THE TIME TO THE SPECIFIED TIME ELEMENT.
            setGameTime(minutes + ':' + seconds);

            if (diff <= 0) {
        // ADD ONE SECOND, SO THAT THE COUNT DOWN 
        // STARTS AT THE FULL DURATION ; example 05:00 not 04:59
                start = Date.now() + 1000;
            }
        }
        // START THE TIMER IMMEDIATELY
        // DON'T WANT TO WAIT A FULL SECOND BEFORE THE TIMER STARTS
        timer();
        // GIVE THE TIMER AN INTERVAL AND AN INTERVAL NAME (myTimer) 
        // SO WE CAN CONTROL IT LATER.
        window.myTimer = setInterval(timer, 1000);
    }
    
    // Start Time
    const initiateTimeCount = (time) => {
        let duration = 60 * time
        startTimer(duration);
    }

    // Pause Time
    const pauseTime = () => {
        if(window.myTimer) {
            clearInterval(window.myTimer);
            window.myTimer = null;
        }
    }

    // Resume Time
    const resumeTime = () =>  {
            let currentTime = (currentMinutes * 60) + (currentSeconds);
            let newTime = currentTime / 60;
            initiateTimeCount(newTime);
    }

    // Add Time
    const addTime = (addedTime) => {
        pauseTime()
        let currentTime = (currentMinutes * 60) + (currentSeconds);
        let oldTime = currentTime / 60;
        initiateTimeCount(oldTime + addedTime);
    }
    
    // Reduce Time
    const reduceTime = (reducedTime) => {
        pauseTime()
        let currentTime = (currentMinutes * 60) + (currentSeconds);
        let oldTime = currentTime / 60;
        if (oldTime > reducedTime) {
            initiateTimeCount(oldTime - reducedTime);
        }else{
            resumeTime()
        }
    }

    // Reset Time
    const resetTime = (rTime) => {
        let currentTime = (currentMinutes * 60) + (currentSeconds);
        let oldTime = currentTime / 60;
        let diffInTime = rTime - oldTime;
        initiateTimeCount(oldTime + diffInTime);
    }
    

    return (
        <TimeContext.Provider value={{
            gameTime, setGameTime,
            isTimeUp, setIsTimeUp,
            initiateTimeCount, pauseTime, resumeTime,
            addTime, reduceTime, resetTime
        }}>
            {props.children}
        </TimeContext.Provider>
    )
}

export default TimeContextProvider