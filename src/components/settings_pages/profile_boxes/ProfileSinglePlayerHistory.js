import React from "react";
import { Link } from "react-router-dom";

const ProfileSinglePlayerHistory = () => {
    const gamePlaySocials = [
        {title: "rank", value: 700, badge: "silver", id:1},
        {title: "team", value: "mozart squad", badge: "vice-captain", id:2}
    ]
    const singlePlayerGamePlayHistories = [
        {title: "vs computer", gameplayed: 50, wins: 36, losses:14, id:1},
        {title: "survival mode", gameplayed: 10, wins: 2, losses:7, id:2},
        {title: "story mode", gameplayed: 22, wins:22, losses:50, id:3},
    ]

    const gamePlaySocialsList = gamePlaySocials.map(social => {
        return (
            <div className="profileGamePlaySocial profileInfo" key={social.id}>
                <p className="profileInfoTitle">{social.title}</p>
                <div className="profileValueWrapper">
                    <p className="profileValue">{social.value}</p>
                    <div className="profileValueButton">
                        <Link to="">🖊</Link>
                    </div>
                </div>
            </div>
        )
    })

    const singlePlayerGamePlayHistoriesList = singlePlayerGamePlayHistories.map(sgph => {
        return ( 
            <div className="profileSinglePlayerGamePlayHistory profileInfo" key={sgph.id}>
                <p className="profileInfoTitle">{sgph.title}</p>
                <div className="profileValueWrapper">
                    <div className="winsAndLossesStats">
                        <div className="totalDisplay winsAndLossesDisplay">{sgph.gameplayed}</div>
                        <div className="winsDisplay winsAndLossesDisplay">{sgph.wins}</div>
                        <div className="lossesDisplay winsAndLossesDisplay">{sgph.losses}</div>
                    </div>
                </div>
            </div>
        )
    })

    return (          
        <div className="profileInfoDisplay profileSingleGamePlayHistory profileBox">
            <h5>Game Play Social History</h5>
            {gamePlaySocialsList}
            <br />
            <h5>Single Player Game History</h5>
            {singlePlayerGamePlayHistoriesList}
        </div>
    )
}

export default ProfileSinglePlayerHistory