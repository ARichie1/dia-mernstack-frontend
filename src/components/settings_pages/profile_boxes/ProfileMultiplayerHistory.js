import React, { useState } from "react";
import { useUserContext } from "../../../hooks/useUserContext";

const ProfileMultiplayerHistory = () => {
    const {multiplayerGamePlayHistories} = useUserContext()

    const [multiplayerHistory, setMultiplayerHistory] = useState({showTotal: true, showHosted: false, showJoined: false,})
    const displayMultiplayerHistory = (history) => {
        if (history === "total") setMultiplayerHistory({showTotal: true, showHosted: false, showJoined: false})
        else if (history === "hosted") setMultiplayerHistory({showTotal: false, showHosted: true, showJoined: false})
        else if (history === "joined") setMultiplayerHistory({showTotal: false, showHosted: false, showJoined: true})
    }
    const multiplayerGamePlayHistoriesList = multiplayerGamePlayHistories ? multiplayerGamePlayHistories.map(mgph => {
        return ( 
            <div className="profileMultiplayerGamePlayHistory profileInfo" key={Math.random()}>
                <p className="profileInfoTitle">{mgph.title}</p>
                <div className="profileValueWrapper">
                    {   multiplayerHistory.showTotal && 
                        <div className="historyTotal multiplayerHistoryDisplay">
                            <div className="winsAndLossesStats">
                                <div className="totalDisplay winsAndLossesDisplay">{mgph.total.gameplayed}</div>
                                <div className="winsDisplay winsAndLossesDisplay">{mgph.total.wins}</div>
                                <div className="lossesDisplay winsAndLossesDisplay">{mgph.total.losses}</div>
                            </div>
                        </div>
                    }

                    {   multiplayerHistory.showHosted && 
                        <div className="historyWhenHosted multiplayerHistoryDisplay">
                            <div className="winsAndLossesStats">
                                <div className="totalDisplay winsAndLossesDisplay">{mgph.whenHost.gameplayed}</div>
                                <div className="winsDisplay winsAndLossesDisplay">{mgph.whenHost.wins}</div>
                                <div className="lossesDisplay winsAndLossesDisplay">{mgph.whenHost.losses}</div>
                            </div>
                        </div>
                    }

                    {   multiplayerHistory.showJoined && 
                        <div className="historyWhenJoined multiplayerHistoryDisplay">
                            <div className="winsAndLossesStats">
                                <div className="totalDisplay winsAndLossesDisplay">{mgph.whenJoin.gameplayed}</div>
                                <div className="winsDisplay winsAndLossesDisplay">{mgph.whenJoin.wins}</div>
                                <div className="lossesDisplay winsAndLossesDisplay">{mgph.whenJoin.losses}</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }) : null

    return (
        <div className="profileInfoDisplay profileMultiplayerGamePlayHistory profileBox">
            <h5>MultiPlayer Game History</h5>
            <div className="historyHeader">
                <div className="historyHeaderStats">
                    <div className="totalHeaderDisplay headerDisplay" 
                        style={{background: `${multiplayerHistory.showTotal ? "var(--themeColor)" : "transparent"}`}}
                        onClick={() => displayMultiplayerHistory("total")}>Total</div>
                    <div className="hostedHeaderDisplay headerDisplay" 
                        style={{background: `${multiplayerHistory.showHosted ? "var(--themeColor)" : "transparent"}`}}
                        onClick={() => displayMultiplayerHistory("hosted")}>Hosted</div>
                    <div className="joinedHeaderDisplay headerDisplay" 
                        style={{background: `${multiplayerHistory.showJoined ? "var(--themeColor)" : "transparent"}`}}
                        onClick={() => displayMultiplayerHistory("joined")}>Joined</div>
                </div>
            </div>
            {multiplayerGamePlayHistoriesList}
        </div>
    )
}

export default ProfileMultiplayerHistory