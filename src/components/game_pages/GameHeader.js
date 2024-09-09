import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../reuseable/controls/Arrow";
import { AuthContext } from "../../contexts/AuthContext";
import { AppGlobalVariableContext } from "../../contexts/AppGlobalVariableContext";

const GameHeader = ({showNavBlock}) => {
    const navigate = useNavigate()
    const handleNavigate = () => {navigate(-1)}

    const {imgFolder} = useContext(AppGlobalVariableContext)

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [profileImage, setProfileImage] = useState({name: "gow.jpg", pos: 300, id:3})
    const [rank, setRank] = useState(600)
    const [team, setTeam] = useState("Mozart Squard")
    const [keys, setKeys] = useState(9)
    const [tokens, setTokens] = useState(100)
    const [usdt, setUsdt] = useState(100)
    const [opponentProfileImage, setOpponentProfileImage] = useState({name: "asta2.jpeg", pos: 300, id:3})
    
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