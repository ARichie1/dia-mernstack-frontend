import React, { useContext, useEffect, useState } from "react";
import DifficultySelector from "./DifficultySelector";
import { GameContext } from "../../../contexts/GameContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

const FaceOffPage = ({player, opponent}) => {
    const [host, setHost] = useState(null)
    const [isPlayerHost, setisPlayerHost] = useState(true)
    const [isOpponentHost, setisOpponentHost] = useState(false)

    const {chosenDifficulty, hasSelectedDifficulty, insertDifficulty
    } = useContext(GameContext)

    const [opponentConnected,  setOpponentConnected] = useState(true)
    const [showHostSettings, setShowHostSettings] = useState({
        opened: false,
        buttonColor: "var(--themeColor)",
        buttonBackground: "transparent"
    })

    const { profileImage, opponentProfileImage } = useContext(AuthContext)

    useEffect( () => {
        if (player.host) {
            setHost(player)
            setisPlayerHost(true)
            setisOpponentHost(false)
        }else{
            setHost(opponent)
            setisOpponentHost(true)
            setisPlayerHost(false)
        }

        opponent.connected ? setOpponentConnected(true) : setOpponentConnected(false)
    }, [host, player, opponent])

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
                        <img src={`../../../../assets/images/faces/${profileImage.name}`} className="hostImg" alt="" />
                        <p className="opponentImg">
                            You &nbsp;
                            {isPlayerHost && (<em> ( Host )</em>)}
                        </p>   
                    </div>
                    <div className="versus pic">VS</div>
                    {!opponentConnected &&
                        <div className="waitingForOpponent pic">waiting...</div>}
                    {opponentConnected && 
                        <div className="playerOpponentFaceOffSide playersFaceOffSide pic">
                            <img src={`../../../../assets/images/faces/${opponentProfileImage.name}`}  className="opponentImg" alt="" />
                            <p className="opponentImg">
                                {opponent.name} &nbsp;
                                {isOpponentHost && (<em> ( Host )</em>)}
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
                <div className="selectYourCode">
                    <div className="clkBtn">
                        <Link to="/game/multiplayer/select-code">BUILD YOUR CODE</Link>
                    </div>
                </div>
            </div> 
            {showHostSettings.opened && (
                <div className="hostSettings">
                    <DifficultySelector insertDifficulty={ insertDifficulty } otherActions={toggleHostSettings}/>
                </div>
            )}   
            
            {isPlayerHost && (
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