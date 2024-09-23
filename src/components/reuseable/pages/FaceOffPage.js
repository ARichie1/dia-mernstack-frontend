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

    const {isHost, isJoin, isInRoom, setIsInRoom,
        isRoomFull,  setIsRoomFull} = useGameContext()

    const {chosenDifficulty, hasSelectedDifficulty, insertDifficulty
    } = useContext(GameContext)

    const setOpponent = async () => {
        const socket = socketInService.socket
        setIsInRoom(true)

        const opponent = await socketGameService.getOpponent(socket)
        .then((data) => {
            if (data) {
                console.log(data); 
                setIsRoomFull(true)
                console.log("Fetched Opponent");
                setCurrentOpponent(data)
            }
        })
        .catch((err) => {
            alert(err)
            setIsRoomFull(false)
        })
    }

    useEffect(() => {
        if(!isRoomFull){
            setOpponent()
        }
    }, [isRoomFull])

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
                <div className="faceOffWrapper">
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
                {isRoomFull && <div className="selectYourCode">
                    <div className="clkBtn">
                        <Link to="/game/multiplayer/select-code">BUILD YOUR CODE</Link>
                    </div>
                </div>}
            </div> 
            {showHostSettings.opened && (
                <div className="hostSettings">
                    <DifficultySelector insertDifficulty={ insertDifficulty } otherActions={toggleHostSettings}/>
                </div>
            )}   
            
            {isHost && (
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