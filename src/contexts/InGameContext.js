import React, { createContext, useState } from 'react'
import { useGameContext } from '../hooks/useGameContext'
import socketInService from '../hooks/connections/socketService'
import socketGameService from '../hooks/connections/gameService'

export const InGameContext = new createContext()

const InGameContextProvider = (props) => {

    const [showPlayerPredictions, setShowPlayerPredictions] = useState(false)
    const [showOpponentPredictions, setShowOpponentPredictions] = useState(false)
    const [showOpponentCurrentPredictions, setShowOpponentCurrentPredictions] = useState(false)
    const [showOpponentScreen, setShowOpponentScreen] = useState(false)
  
    const {setIsTurn, isMultiplayer} = useGameContext()
    
    const [activePrediction, setActivePrediction] = useState([]) 
    const [currentPrediction, setCurrentPrediction] = useState(
        {codes: [], results: [], id: 0}
    ) 

    const [playerPredictions, setPlayerPredictions] = useState([]) 

    const [opponentActivePrediction, setOpponentActivePrediction] = useState([]) 
    const [opponentCurrentPrediction, setOpponentCurrentPrediction] = useState(
        {codes: [], results: [], id: 0}
    ) 
    const [opponentPredictions, setOpponentPredictions] = useState([]) 
    
    // Recieve Opponent Active Prediction
    const recieveOpponentAP = async () => {
        const socket = socketInService.socket
        await socketGameService.recieveOpponentActivePrediction(socket)
        .then((data) => {setOpponentActivePrediction(data)})
        .catch((err) => {console.log(err);})
    }

    // Recieve Opponent Current Prediction
    const recieveOpponentCP = async () => {
        const socket = socketInService.socket
        await socketGameService.recieveOpponentCurrentPrediction(socket)
        .then(({selection, results}) => {
             // Update Opponent Current Prediction
            setOpponentCurrentPrediction({
                codes : selection,
                results, id: Math.random()
            })

            // Add Opponent Current CP To Opponent Prediction List
            setOpponentPredictions([
                ...opponentPredictions, 
                {codes : selection, results, id: Math.random()}
            ])

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
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Run an interval loop 
    // that checks for real time opponent's APs and CP
    const recieveOpponentAPandCP = (turn) => {
        setInterval( () => {
            recieveOpponentAP()
            recieveOpponentCP()
        }, 1000)
    }

    // Send The Players CP To The Server
    const sendValidActivePrediction = async () => {
        console.log("sent VALID active selection : ");
            
        const socket = socketInService.socket
        await socketGameService.sendCurrentPredictionToServer(socket, activePrediction)
        .then((data) => {
            console.log("sending valid Cp cp");
            
            // Update Player's Current Prediction
            setCurrentPrediction({
                codes : activePrediction,
                results : data,
                id: Math.random()
            })

            // Add Player's CP To Player's Prediction List
            setPlayerPredictions([
                ...playerPredictions, 
                {codes : activePrediction, results : data, id: Math.random()}
            ])

            // if (gameType === "multiplayer") {
                // Switch Turns
            if (isMultiplayer) {
                setIsTurn(false)

                // After few seconds show the opponent screen
                setTimeout(() => {
                    // Switch To Showing AP ON Opponent Screen Mirror
                    setShowOpponentCurrentPredictions(false)
                    setShowOpponentScreen(true)
                }, 2000);
            }
            // }  

            // Handle Result Outcome Here
        })
        .catch((err) => {
            console.log(err);
            console.log("no cp cps");
            
        }) 
    }

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