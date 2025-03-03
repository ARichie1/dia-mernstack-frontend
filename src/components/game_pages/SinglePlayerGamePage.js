import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import GameScene from "../reuseable/pages/GameScene";
import PlayerTab from "../ingame/PlayerTab";
import OutComePopUp from "../reuseable/pop_ups/OutComePopUp";
import { useInGameContext } from "../../hooks/useInGameContext";

const SinglePlayerGamePage = () => {
    const { userInfo } = useAuthContext()
    const {showOutcomePopUp} = useInGameContext()
    
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