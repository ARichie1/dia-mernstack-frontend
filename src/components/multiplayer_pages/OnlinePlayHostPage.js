import React, { useState } from "react";
import DifficultySelector from "../reuseable/DifficultySelector";

const OnlinePlayHostPage = () => {
    const [difficulty,  setDifficulty] = useState(true)
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
        <div className="multiplayerFaceOffPage wrapper">
            <div className="multiplayerFaceOff">
                <div>
                    <div className="host pic">
                        <img src="../../../assets/images/faces/asta3.jpeg" className="hostImg" alt="" />
                        <p className="opponentImg">You</p>   
                    </div>
                    <div className="versus pic">VS</div>
                    <div className="waitingForOpponent pic">waiting...</div>
                    <div className="join pic">
                        <img src="../../../assets/images/faces/asta1.jpeg" className="opponentImg" alt="" />
                        <p className="opponentImg">Jack</p>
                    </div>
                </div>
                {difficulty &&  (
                    <div className="selectedDifficultyByHost">
                        <p>DIFFICULTY : HARD</p>
                        <span>HARD</span>
                    </div>
                )}
                <div className="selectYourCode">BUILD YOUR CODE</div>
            </div> 
            {showHostSettings.opened && (
                <div className="hostSettings">
                    <DifficultySelector />
                </div>
            )}   
            
            <div className="hostSettingsButton" 
                onClick={() => {toggleHostSettings()}} 
                style={{color: `${showHostSettings.buttonColor}`, 
                    background: `${showHostSettings.buttonBackground}`}}>
                    ⚙
            </div>
        </div>
    )
}

export default OnlinePlayHostPage