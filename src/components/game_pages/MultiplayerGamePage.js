import React from "react";
import GameScene from "../reuseable/pages/GameScene";
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import PlayerTab from "../ingame/PlayerTab";
import OutComePopUp from "../reuseable/pop_ups/OutComePopUp";

const MultiplayerGamePage = () => {
    const { userInfo } = useAuthContext()
    const { currentOpponent} = useUserContext()

    return (
        <div className="multiplayerGamePage wrapper">
            <div className="multiPlayerGameSceneWrapper gameSceneWrapper">
                <div className="opponentTab playersTab">
                    <PlayerTab playerInfo={currentOpponent} />
                </div>
                <GameScene />
                <div className="playerTab playersTab">
                    <PlayerTab playerInfo={userInfo}/>
                </div>
                <OutComePopUp />
            </div>
        </div> 
    )
}

export default MultiplayerGamePage