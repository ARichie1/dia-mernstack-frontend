import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../reuseable/Arrow";

const GameHeader = ({showNavBlock}) => {
    const navigate = useNavigate()
    const handleNavigate = () => {navigate(-1)}

    return (
        <div className="gameHeader">
            <div className="gameHeaderInner">
                <h3 className="title topStatValues"><Link to="/game">WTF</Link></h3>
                <ul>
                    <li className="tokens topStatValues">
                        <span className="tokensAmount">100000</span> &#128176;
                    </li>
                    <li className="keys topStatValues">
                        <span className="keysAmount">30</span> &#128273;
                    </li>
                    <li className="accountSettingsIcon topStatValues">
                        <span className="accountIcon">🧞‍♂️</span> 
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