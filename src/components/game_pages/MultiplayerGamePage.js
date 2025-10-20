import React from "react";
import { useUserContext } from "../../hooks/useUserContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useOutcomeContext } from "../../hooks/useOutcomeContext";
import GameScene from "../reuseable/pages/GameScene";
import PlayerTab from "../ingame/PlayerTab";
import OutComePopUp from "../reuseable/pop_ups/OutComePopUp";

const MultiplayerGamePage = () => {
    const { userInfo } = useAuthContext()
    const { currentOpponent} = useUserContext()
    const {showOutcomePopUp} = useOutcomeContext()

    return (
        <div className="multiplayerGamePage wrapper">
            <div className="multiPlayerGameSceneWrapper gameSceneWrapper">
                <div className="opponentTab playersTab">
                    <PlayerTab playerInfo={currentOpponent} isOpponent={true}/>
                </div>
                <GameScene />
                <div className="playerTab playersTab">
                    <PlayerTab playerInfo={userInfo} isOpponent={false}/>
                </div>
                {showOutcomePopUp && <OutComePopUp />}
            </div>
        </div> 
    )
}

export default MultiplayerGamePage