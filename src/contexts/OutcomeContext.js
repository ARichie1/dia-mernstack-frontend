import React, { createContext, useState } from 'react'

export const OutcomeContext = new createContext()

const OutcomeContextProvider = (props) => {
    const [outcomeInfo, setOutcomeInfo] = useState({})
    const [showOutcomePopUp, setShowOutcomePopUp] = useState(false)
    const [isPauseGame, setIsPauseGame] = useState(false) 
    const [isExitGame, setIsExitGame] = useState(false)  
    const [isCodeCracked, setIsCodeCracked] = useState(false) 
    const [isOutOfMove, setIsOutOfMove] = useState(false) 
    const [gameMoves, setGameMoves] = useState(8)

    const [saveMe, setSaveMe] = useState(false)
    const [showSaveMeBtn, setShowSaveMeBtn] = useState(false)

    const [canTryAgain, setCanTryAgain] = useState(false)
    const [showTryAgainBtn, setShowTryAgainBtn] = useState(false)
    const [showMenuBtn, setShowMenuBtn] = useState(false)

    const [canMoveToNext, setCanMoveToNext] = useState(false)
    const [showNextBtn, setShowNextBtn] = useState(false)

    const outcomesArray = {
        exit : {
            audio : "pauseGame", image : "&#128694;",
            title: "Exit??",
            message: "Do You Want To Quit This Game?",
        },
        pause : {
            audio : "pauseGame", image : "&#128400;",
            title: "Game Paused ||",
            message: "pause  pause pause",
        },
        terminated : {
            audio : "Code Cracked", image : "&#128406;",
            title: "Hacker ^_*",
            message: "Congratulation You Cracked The Code!!",
        },
        timeup : {
            audio : "timeup", image : "&#128347;",
            title: "Oops!! Time Up",
            message: "What A Slow ModaFuka",
        },
        outofmoves : {
            audio : "outofmoves", image : "#&128695;",
            title: "Oops!! No More Move",
            message: "You Had Move But Wasted It Asshole",
        }
    }

    const setAndShowOutcomePopUp = (outcome) => {
        
        setIsExitGame(false); setIsCodeCracked(false)
        setSaveMe(false); setShowSaveMeBtn(false)
        setShowMenuBtn(false); setCanTryAgain(false)
        setShowTryAgainBtn(false)
        setCanMoveToNext(false); setShowNextBtn(false)

        if (outcome === "terminated"){
            setIsCodeCracked(true)
            setOutcomeInfo(outcomesArray.terminated)
            setShowMenuBtn(true)
            setShowTryAgainBtn(true)
        }else if (outcome === "timeup"){
            setOutcomeInfo(outcomesArray.timeup)
        }else if (outcome === "outofmoves"){
            setIsOutOfMove(true)
            setOutcomeInfo(outcomesArray.outofmoves)
        }else if (outcome === "pause"){
            setIsPauseGame(true)
            setOutcomeInfo(outcomesArray.pause)
        }else if (outcome === "exit"){
            setIsExitGame(true)
            setOutcomeInfo(outcomesArray.exit)
        }

        setShowOutcomePopUp(true)
    }

    const clearAndHideOutcomePopUp = () => {
        setShowOutcomePopUp(!showOutcomePopUp)
        setOutcomeInfo({})
    }
    
    return (
        <OutcomeContext.Provider value={{
            showOutcomePopUp, setShowOutcomePopUp,
            outcomeInfo, setOutcomeInfo, 
            setAndShowOutcomePopUp, clearAndHideOutcomePopUp,
            isPauseGame, setIsPauseGame,
            isExitGame, setIsExitGame,
            isCodeCracked, setIsCodeCracked,
            isOutOfMove, setIsOutOfMove,
            gameMoves, setGameMoves,

            saveMe, setSaveMe,
            showSaveMeBtn, setShowSaveMeBtn,
            canTryAgain, setCanTryAgain,
            showTryAgainBtn, setShowTryAgainBtn,
            showMenuBtn, setShowMenuBtn,
            canMoveToNext, setCanMoveToNext,
            showNextBtn, setShowNextBtn,
        }}>
            {props.children}
        </OutcomeContext.Provider>
    )
}

export default OutcomeContextProvider