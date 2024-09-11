import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUserContext";

const ProfileSinglePlayerHistory = () => {
    const {gamePlaySocials, singlePlayerGamePlayHistories} = useUserContext()

    const gamePlaySocialsList = gamePlaySocials ? gamePlaySocials.map(social => {
        return (
            <div className="profileGamePlaySocial profileInfo" key={Math.random()}>
                <p className="profileInfoTitle">{social.title}</p>
                <div className="profileValueWrapper">
                    <p className="profileValue">{social.value}</p>
                    <div className="profileValueButton">
                        <Link to="">🖊</Link>
                    </div>
                </div>
            </div>
        )
    }) : null

    const singlePlayerGamePlayHistoriesList = singlePlayerGamePlayHistories ? singlePlayerGamePlayHistories.map(sgph => {
        return ( 
            <div className="profileSinglePlayerGamePlayHistory profileInfo" key={Math.random()}>
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
    }) : null

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