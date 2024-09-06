import React, { createContext, useEffect, useState } from 'react'

export const InGameContext = new createContext()

const InGameContextProvider = (props) => {
    const [activePrediction, setActivePrediction] = useState([]) 
    
    const [currentPrediction, setCurrentPrediction] = useState(
        {codes: [
            {value: "paid_wakanda", btn_id: 7, id: 0},
            {value: "paid_wakanda", btn_id: 3, id: 1},
            {value: "paid_wakanda", btn_id: 2, id: 2},
            {value: "paid_wakanda", btn_id: 6, id: 3}
        ], 
        results: [
            {title: "dead", value: "D", emoji: "💀", id: 0},
            {title: "dead", value: "D", emoji: "💀", id: 1},
            {title: "injured", value: "I", emoji: "🤕", id: 2},
            {title: "alive", value: "A", emoji: "😁", id: 3},
        ], 
        id: 0}
    ) 
    const [playerPredictions, setPlayerPredictions] = useState([
        {codes: [
            {value: "paid_wakanda", btn_id: 7, id: 0},
            {value: "paid_wakanda", btn_id: 3, id: 1},
            {value: "paid_wakanda", btn_id: 2, id: 2},
            {value: "paid_wakanda", btn_id: 6, id: 3}
        ], 
        results: [
            {title: "dead", value: "D", emoji: "💀", id: 0},
            {title: "dead", value: "D", emoji: "💀", id: 1},
            {title: "injured", value: "I", emoji: "🤕", id: 2},
            {title: "alive", value: "A", emoji: "😁", id: 3},
        ], 
        id: 0},
        {codes: [
            {value: "paid_wakanda", btn_id: 7, id: 0},
            {value: "paid_wakanda", btn_id: 3, id: 1},
            {value: "paid_wakanda", btn_id: 2, id: 2},
            {value: "paid_wakanda", btn_id: 6, id: 3}
        ], 
        results: [
            {title: "dead", value: "D", emoji: "💀", id: 0},
            {title: "dead", value: "D", emoji: "💀", id: 1},
            {title: "injured", value: "I", emoji: "🤕", id: 2},
            {title: "alive", value: "A", emoji: "😁", id: 3},
        ], 
        id: 1}
    ]) 
    const [opponentPredictions, setOpponentPredictions] = useState([
        {codes: [
            {value: "paid_wakanda", btn_id: 7, id: 0},
            {value: "paid_wakanda", btn_id: 3, id: 1},
            {value: "paid_wakanda", btn_id: 2, id: 2},
            {value: "paid_wakanda", btn_id: 6, id: 3}
        ], 
        results: [
            {title: "dead", value: "D", emoji: "💀", id: 0},
            {title: "dead", value: "D", emoji: "💀", id: 1},
            {title: "injured", value: "I", emoji: "🤕", id: 2},
            {title: "alive", value: "A", emoji: "😁", id: 3},
        ], 
        id: 0},
        {codes: [
            {value: "paid_wakanda", btn_id: 7, id: 0},
            {value: "paid_wakanda", btn_id: 3, id: 1},
            {value: "paid_wakanda", btn_id: 2, id: 2},
            {value: "paid_wakanda", btn_id: 6, id: 3}
        ], 
        results: [
            {title: "dead", value: "D", emoji: "💀", id: 0},
            {title: "dead", value: "D", emoji: "💀", id: 1},
            {title: "injured", value: "I", emoji: "🤕", id: 2},
            {title: "alive", value: "A", emoji: "😁", id: 3},
        ], 
        id: 1}
    ]) 

    const updatePlayerPredictionsList = () => {
        setPlayerPredictions([...playerPredictions, currentPrediction])
    }

    const sendActivePrediction = () => {
        setCurrentPrediction({
            codes : activePrediction,
            results : []
        })
        console.log(currentPrediction);
                
        // setPlayerPredictions([...playerPredictions, currentPrediction])
        // updatePlayerPredictionsList()
    }

    useEffect(() => {
        updatePlayerPredictionsList()
    }, [currentPrediction])



    return (
        <InGameContext.Provider value={{
            activePrediction, setActivePrediction,
            currentPrediction, setCurrentPrediction,
            playerPredictions, setPlayerPredictions,
            opponentPredictions, setOpponentPredictions,
            sendActivePrediction,
        }}>
            {props.children}
        </InGameContext.Provider>
    )
}

export default InGameContextProvider