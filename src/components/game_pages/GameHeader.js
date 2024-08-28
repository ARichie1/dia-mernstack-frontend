import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../reuseable/controls/Arrow";
import { AuthContext } from "../../contexts/AuthContext";
import { AppGlobalVariableContext } from "../../contexts/AppGlobalVariableContext";

const GameHeader = ({showNavBlock}) => {
    const navigate = useNavigate()
    const handleNavigate = () => {navigate(-1)}

    const {keys, tokens, profileImage} = useContext(AuthContext)
    const {imgFolder} = useContext(AppGlobalVariableContext)

    return (
        <div className="gameHeader">
            <div className="gameHeaderInner">
                <h3 className="title topStatValues">
                    <Link to="/game">WTF</Link>
                </h3>
                <ul>
                    <li className="usdt topStatValues">
                        <Link to="/game/settings/profile">
                            &#128178;
                            <span className="tokensAmount">{tokens}</span>
                        </Link>
                    </li>
                    <li className="tokens topStatValues">
                        <Link to="/game/settings/profile">
                            &#128176;
                            <span className="tokensAmount">{tokens}</span>
                        </Link>
                    </li>
                    <li className="keys topStatValues">
                        <Link to="/game/settings/profile">
                            &#128273;
                            <span className="keysAmount">{keys}</span>
                        </Link>
                    </li>
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