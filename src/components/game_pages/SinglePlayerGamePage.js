import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOutcomeContext } from "../../hooks/useOutcomeContext";
import GameScene from "../reuseable/pages/GameScene";
import PlayerTab from "../ingame/PlayerTab";
import OutComePopUp from "../reuseable/pop_ups/OutComePopUp";

const SinglePlayerGamePage = () => {
    const { userInfo } = useAuthContext()
    const {showOutcomePopUp} = useOutcomeContext()
    
    return (
        <div className="singlePlayerGamePage wrapper">
            <div className="singlePlayerGameSceneWrapper gameSceneWrapper">
                <div className="playerTab playersTab">
                    <PlayerTab playerInfo={userInfo}/>
                </div>
                <GameScene />
                {showOutcomePopUp && <OutComePopUp />}
            </div>
        </div> 
    )
}

export default SinglePlayerGamePage