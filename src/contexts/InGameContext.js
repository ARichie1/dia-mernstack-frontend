import React, { createContext, useEffect, useState } from 'react'
import { useGameContext } from '../hooks/useGameContext'
import socketInService from '../hooks/connections/socketService'
import socketGameService from '../hooks/connections/gameService'

export const InGameContext = new createContext()

const InGameContextProvider = (props) => {

    const [showPlayerPredictions, setShowPlayerPredictions] = useState(false)
    const [showOpponentPredictions, setShowOpponentPredictions] = useState(false)
    const [showOpponentCurrentPredictions, setShowOpponentCurrentPredictions] = useState(false)
    const [showOpponentScreen, setShowOpponentScreen] = useState(false)
  
    const {isTurn,  setIsTurn} = useGameContext()
    
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

    const [opponentActivePrediction, setOpponentActivePrediction] = useState([]) 
    
    const [opponentCurrentPrediction, setOpponentCurrentPrediction] = useState(
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
    const updateOpponentPredictionsList = () => {
        setPlayerPredictions([...opponentPredictions, opponentCurrentPrediction])
    }

    const recieveOpponentAP = async (interval) => {
        // console.log("recieving real tim aps");
        
        const socket = socketInService.socket
        const sent = await socketGameService.recieveOpponentActivePrediction(socket)
        .then((data) => {
            // console.log("recieved active selection : ", data);
            setOpponentActivePrediction(data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const recieveOpponentCP = async (interval) => {
        // console.log("recieving real tim cp");
        
        const socket = socketInService.socket
        const sent = await socketGameService.recieveOpponentCurrentPrediction(socket)
        .then(({selection, results}) => {
            // console.log("recieved opponent current selection : ", selection);
            setOpponentCurrentPrediction({
                codes : selection,
                results, id: Math.random()
            })

            // Switch To Showing CP ON Opponent Screen Mirror
            setShowOpponentCurrentPredictions(true)

            // After few seconds hide the opponent screen mirror
            setTimeout(() => {
                // Clear players current prediction screen
                setCurrentPrediction(null)

                setShowOpponentCurrentPredictions(false)
                setShowOpponentScreen(false)

                // Then clear the opponent mirror screen
                setOpponentActivePrediction(null)
                setOpponentCurrentPrediction(null)
            }, 2000);

            // Switch turns so reciever can now play
            setIsTurn(true)
            console.log("I am playing now");
            
            // Stop the gameProps checker
            if (interval) {
                clearInterval(interval)
                console.log("interval cleared");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    
    const recieveOpponentAPandCP = (turn) => {
        let checkingForOpponentAP
        // console.log("passed turn : ", turn);
        // console.log("isTurn : ", isTurn);

        // if (!isTurn) {
        //     recieveOpponentAPandCP(isTurn)
        //     setShowOpponentScreen(true)
        // }
        
        // if (!isTurn) {
            // Check for real time opponent action
            // console.log("Check for real time opponent action");
            setInterval( () => {
                // console.log("No OAP Yet ...");
                recieveOpponentAP()
                recieveOpponentCP()
            }, 1000);
        // }
    }

    const sendValidActivePrediction = async () => {
        console.log("sent VALID active selection : ");
            
        const socket = socketInService.socket
        const sent = await socketGameService.sendCurrentPredictionToServer(socket, activePrediction)
        .then((data) => {
            console.log("sending valid Cp cp");
            
            setCurrentPrediction({
                codes : activePrediction,
                results : data
            })

            // Switch Turns
            setIsTurn(false)

            // Switch To Showing AP ON Opponent Screen Mirror
            setShowOpponentCurrentPredictions(false)

            // After few seconds show the opponent screen
            setTimeout(() => {
                setShowOpponentCurrentPredictions(true)
                setShowOpponentScreen(true)
            }, 2000);

            // Check for real time opponent action
            // console.log("Check for real time opponent action");
            // let checkingForOpponentAP = setInterval( () => {
                // console.log("No OAP Yet ...");
                // recieveOpponentAP()
                // recieveOpponentCP(checkingForOpponentAP)
            // }, 1000);

            // Start recieving opponent AP and CP Again
            // recieveOpponentAPandCP(false)
            console.log("Starting to recieving opponent AP and CP Again ...");
        })
        .catch((err) => {
            console.log(err);
            console.log("no cp cps");
            
        }) 
        // setPlayerPredictions([...playerPredictions, currentPrediction])
        // updatePlayerPredictionsList()
    }

    // useEffect(() => {
    //     updatePlayerPredictionsList()
    // }, [currentPrediction])
    // useEffect(() => {
    //     updateOpponentPredictionsList()
    // }, [opponentCurrentPrediction])

    return (
        <InGameContext.Provider value={{
            activePrediction, setActivePrediction,
            currentPrediction, setCurrentPrediction,
            playerPredictions, setPlayerPredictions,
            opponentActivePrediction, setOpponentActivePrediction,
            opponentCurrentPrediction, setOpponentCurrentPrediction,
            opponentPredictions, setOpponentPredictions,
            
            showPlayerPredictions, setShowPlayerPredictions,
            showOpponentPredictions, setShowOpponentPredictions,
            showOpponentScreen, setShowOpponentScreen,
            showOpponentCurrentPredictions, setShowOpponentCurrentPredictions,

            recieveOpponentAP, recieveOpponentCP,
            recieveOpponentAPandCP,
            sendValidActivePrediction
        }}>
            {props.children}
        </InGameContext.Provider>
    )
}

export default InGameContextProvider