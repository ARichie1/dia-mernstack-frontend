import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../reuseable/controls/Arrow";
import { AppGlobalVariableContext } from "../../contexts/AppGlobalVariableContext";
import { useUserContext } from "../../hooks/useUserContext";
import { useUser } from "../../hooks/useUser";
import { useAppGlobalVariableContext } from "../../hooks/useAppGlobalVariableContext";

import socketInService from "../../hooks/connections/socketService";
import socketGameService from "../../hooks/connections/gameService";

const GameHeader = ({showNavBlock}) => {
    const {setUserStates} = useUser()
    const navigate = useNavigate()
    const handleNavigate = () => {navigate(-1)}

    const {imgFolder} = useContext(AppGlobalVariableContext)
    const {profileImage, assets} = useUserContext()
    const {defaultImage} = useAppGlobalVariableContext()

    const assetsList = assets ? assets.map(asset => {
        return (
            <li className="usdt topStatValues"key={Math.random()}>
                <Link to="/game/settings/profile">
                    &#128178;
                    <span className="tokensAmount">{asset.balance}</span>
                </Link>
            </li>
        )
    }) : null

    return (
        <div className="gameHeader">
            <div className="gameHeaderInner">
                <h3 className="title topStatValues">
                    <Link to="/game">WTF</Link>
                </h3>
                <ul>
                    {assetsList}
                    <li className="accountSettingsIcon topStatValues"
                        onClick={() => setUserStates()}>
                        <Link to="/game/settings/profile">
                            <img src={`${imgFolder}${profileImage ? profileImage.value : defaultImage}`} className="profileImg" alt="" />
                        </Link> 
                    </li>
                </ul>
            </div>
            {showNavBlock && (
                <div className="navBlock" onClick={handleNavigate}>
                    <Arrow arrowDirection={180}/>
                </div>
            )}
        </div>
    )
}

export default GameHeader