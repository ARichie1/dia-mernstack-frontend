import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../reuseable/controls/Arrow";
import { AuthContext } from "../../contexts/AuthContext";
import { AppGlobalVariableContext } from "../../contexts/AppGlobalVariableContext";
import { useUserContext } from "../../hooks/useUserContext";

const GameHeader = ({showNavBlock}) => {
    const navigate = useNavigate()
    const handleNavigate = () => {navigate(-1)}

    const {imgFolder} = useContext(AppGlobalVariableContext)
    const [profileImage, setProfileImage] = useState({name: "gow.jpg", pos: 300, id:3})
    const {assets} = useUserContext()

    const assetsList = assets ? assets.map(asset => {
        return (
            <li className="usdt topStatValues">
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
                    <li className="accountSettingsIcon topStatValues">
                        <Link to="/game/settings/profile">
                            <img src={`${imgFolder}${profileImage.name}`} className="profileImg" alt="" />
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