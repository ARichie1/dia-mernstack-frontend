import React from "react";
import { Link } from "react-router-dom";

const GameHeader = (props) => {
    return (
        <div className="game-header">
            <h3 className="title topStatValues"><Link to="/game">WTF</Link></h3>
            <ul>
                <li className="tokens topStatValues">
                    <span className="tokensAmount">0</span> &#128176;
                </li>
                <li className="keys topStatValues">
                    <span className="keysAmount">x</span> &#128273;
                </li>
            </ul>
        </div>
    )
}

export default GameHeader