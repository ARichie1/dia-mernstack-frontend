import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import GameScene from "../reuseable/pages/GameScene";
import PlayerTab from "../ingame/PlayerTab";

const SinglePlayerGamePage = () => {
    const { userInfo } = useAuthContext()
    
    return (
        <div className="singlePlayerGamePage wrapper">
            <div className="singlePlayerGameSceneWrapper gameSceneWrapper">
                <div className="playerTab playersTab">
                    <PlayerTab playerInfo={userInfo}/>
                </div>
                <GameScene />
            </div>
        </div> 
    )
}

export default SinglePlayerGamePage