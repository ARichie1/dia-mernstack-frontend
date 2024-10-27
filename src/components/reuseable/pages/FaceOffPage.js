import React, { useContext, useEffect, useState } from "react";
import DifficultySelector from "./DifficultySelector";
import { GameContext } from "../../../contexts/GameContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUserContext";
import { useAppGlobalVariableContext } from "../../../hooks/useAppGlobalVariableContext";
import { useUser } from "../../../hooks/useUser";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useGameContext } from "../../../hooks/useGameContext";
import socketInService from "../../../hooks/connections/socketService";
import socketGameService from "../../../hooks/connections/gameService";

const FaceOffPage = () => {
    const { user, userInfo: currentPlayer } = useAuthContext()
    const { currentOpponent, setCurrentOpponent} = useUserContext()
    const {defaultImage} = useAppGlobalVariableContext()

    const {isHost, isJoin, setIsInRoom, isRoomFull,  setIsRoomFull, 
        insertDifficulty, gameProperties, setGameProperties,
        canBuildCode, setCanBuildCode,
        isReady,  setIsReady,
        canPlayGame, setCanPlayGame} = useGameContext()

    const {chosenDifficulty, hasSelectedDifficulty} = useContext(GameContext)
    const [hasModifiedGameProps, setHasModifiedGameProps] = useState(false)
    const [isHostReady, setIsHostReady] = useState(false)
    let ready = false

    const setOpponent = async () => {
        const socket = socketInService.socket
        

        const roomFull = await socketGameService.checkIfRoomFull(socket)
        console.log("roomFull : ", roomFull);
        
        if (roomFull) {
            const opponent = await socketGameService.getOpponent(socket)
            .then((data) => {
                if (data) {
                    console.log(data); 
                    setIsInRoom(true)
                    setIsRoomFull(true)
                    console.log("Fetched Opponent");
                    setCurrentOpponent(data)
                    // socketGameService.sendJoinerInfo(socket)
                }
            })
            .catch((err) => {
                alert(err)
                setIsRoomFull(false)
            })
        }
    }

    const recieveGameProps = async (interval) => {
        const socket = socketInService.socket
        const recieved = await socketGameService.recieveGameProperties(socket)
        .then(({gameProperties, hostIsReady}) => {
            setHasModifiedGameProps(true)

            // Set the chosen difficulty for the game context
            insertDifficulty(gameProperties);
            setGameProperties({
                difficulty : gameProperties
            })

            console.log("face off hostIsReady : ", hostIsReady);

            if (hostIsReady) {
                console.log("Has GProps.");

                // Player Becomes Ready To Build Code When Host Is Ready
                setIsHostReady(hostIsReady)
                setIsReady(hostIsReady)
                setCanBuildCode(hostIsReady)

                console.log("I am host ready : ", isHostReady);
                console.log("I am ready : ", isReady);

                // Stop the gameProps checker
                clearInterval(interval)
            }
        })
        .catch((err) => {
            console.log(err);
            setHasModifiedGameProps(false)
        })
    }

    useEffect(() => {
        if (isJoin) {
            setOpponent()

            // Check if the host update the game properties
            const checkingForNewGameProps = setInterval( () => {
                // console.log("I am ready : ", isReady);
                // console.log("I am ready : ", isHostReady);
                
                console.log("No GProps Yet ...");
                recieveGameProps(checkingForNewGameProps)
            }, 10000);
        }

        if (isHost) {
            const socket = socketInService.socket
            let checkingForOpponent = setInterval(async () => {
                const roomFull = await socketGameService.checkIfRoomFull(socket)
                console.log("roomFull : ", roomFull);

                if (roomFull) {
                    console.log("The room is Full")
                    setOpponent()
                    clearInterval(checkingForOpponent)
                }else{
                    console.log("No opponent yet!!");
                    console.log("waiting ...");
                }
            }, 5000);
        }
    }, [])

    // Host Tells Room They Are Ready To Build Code
    const playerReady = () => {
        setCanBuildCode(true)
        setIsReady(true)

        const socket = socketInService.socket
        let saved = socketGameService.saveGameProperties(socket, gameProperties, true)
    }

    const [showHostSettings, setShowHostSettings] = useState({
        opened: false,
        buttonColor: "var(--themeColor)",
        buttonBackground: "transparent"
    })

    const toggleHostSettings = () => {
        setShowHostSettings({
            opened: !showHostSettings.opened,
            buttonColor: showHostSettings.buttonColor === "var(--themeColor)" ? "#000" : "var(--themeColor)",
            buttonBackground: showHostSettings.buttonBackground === "transparent" ? "var(--themeColor)" : "transparent"
        })
    }

    return (
        <div className="multiplayerFaceOffPage subWrapper">
            <div className="multiplayerFaceOff">
                <div className="faceOffWrapper"
                onClick={() => setOpponent()}>
                    <div className="playerFaceOffSide playersFaceOffSide pic">
                        <img src={`../../../../assets/images/faces/${currentPlayer ? currentPlayer.profileImage.value : defaultImage}`} className="hostImg" alt="" />
                        <p className="opponentImg">
                            You &nbsp;
                            {isHost && (<em> ( Host )</em>)}
                        </p>   
                    </div>
                    <div className="versus pic">VS</div>
                    {!currentOpponent &&
                        <div className="waitingForOpponent pic">waiting...</div>}
                    {currentOpponent && 
                        <div className="playerOpponentFaceOffSide playersFaceOffSide pic">
                            <img src={`../../../../assets/images/faces/${currentOpponent ? currentOpponent.image : defaultImage}`}  className="opponentImg" alt="" />
                            <p className="opponentImg">
                                {currentOpponent ? currentOpponent.username : "opponent"} &nbsp;
                                {isJoin && (<em> ( Host )</em>)}
                            </p>
                        </div>
                    }
                </div>
                {hasSelectedDifficulty &&  (
                    <div className="selectedDifficultyByHost" style={{background: chosenDifficulty.color}}>
                        <p>DIFFICULTY : </p>
                        <span>{chosenDifficulty.difficulty} ( {chosenDifficulty.agents} )</span>
                    </div>
                )} 
                {isRoomFull && !isReady && isHost && <div className="selectYourCode">
                    <div className="clkBtn"
                        onClick={() => playerReady()}
                    > Ready </div>
                </div>}
                {isRoomFull  && isReady && canBuildCode && <div className="selectYourCode">
                    <div className="clkBtn">
                        <Link to="/game/multiplayer/select-code">BUILD YOUR CODE</Link>
                    </div>
                </div>}
            </div> 
            {showHostSettings.opened && !isReady && (
                <div className="hostSettings">
                    <DifficultySelector otherActions={toggleHostSettings}/>
                </div>
            )}   
            
            {isHost && !isReady && (
                <div className="hostSettingsButton" 
                    onClick={() => {toggleHostSettings()}} 
                    style={{color: `${showHostSettings.buttonColor}`, 
                        background: `${showHostSettings.buttonBackground}`}}>
                        ⚙
                </div>
            )}
        </div>
    )
}

export default FaceOffPage