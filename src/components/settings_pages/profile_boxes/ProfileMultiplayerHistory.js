import React, { useState } from "react";

const ProfileMultiplayerHistory = () => {
    const multiplayerGamePlayHistories = [
        {
            title: "offline multiplayer", gameplayed: 39, 
            wins: 30, losses:9,
            whenHost: {gameplayed: 20, wins: 16, losses:4}, 
            whenJoin: {gameplayed: 19, wins: 12, losses:7}, 
            id:1
        },
        {
            title: "online multiplayer", gameplayed: 30, 
            wins: 25, losses:5,
            whenHost: {gameplayed: 18, wins: 10, losses:8}, 
            whenJoin: {gameplayed: 12, wins: 8, losses:4}, 
            id:2
        }
    ]

    const [multiplayerHistory, setMultiplayerHistory] = useState({showTotal: true, showHosted: false, showJoined: false,})
    const displayMultiplayerHistory = (history) => {
        if (history === "total") setMultiplayerHistory({showTotal: true, showHosted: false, showJoined: false})
        else if (history === "hosted") setMultiplayerHistory({showTotal: false, showHosted: true, showJoined: false})
        else if (history === "joined") setMultiplayerHistory({showTotal: false, showHosted: false, showJoined: true})
    }
    const multiplayerGamePlayHistoriesList = multiplayerGamePlayHistories.map(mgph => {
        return ( 
            <div className="profileMultiplayerGamePlayHistory profileInfo" key={mgph.id}>
                <p className="profileInfoTitle">{mgph.title}</p>
                <div className="profileValueWrapper">
                    {   multiplayerHistory.showTotal && 
                        <div className="historyTotal multiplayerHistoryDisplay">
                            <div className="winsAndLossesStats">
                                <div className="totalDisplay winsAndLossesDisplay">{mgph.gameplayed}</div>
                                <div className="winsDisplay winsAndLossesDisplay">{mgph.wins}</div>
                                <div className="lossesDisplay winsAndLossesDisplay">{mgph.losses}</div>
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
    })

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