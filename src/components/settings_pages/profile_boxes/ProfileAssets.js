import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const ProfileAssets = () => {
    const {keys, tokens, usdt} = useContext(AuthContext)
    const assets = [
        {name: "keys", balance: keys, id:1},
        {name: "token", balance: tokens, id:2},
        {name: "usdt", balance: usdt, id:3}
    ]

    const assetsList = assets.map(asset => {
        return (
            <div className="profileAsset profileInfo" key={asset.id}>
                <p className="profileInfoTitle">{asset.name}</p>
                <div className="profileValueWrapper">
                    <p className="profileValue">{asset.balance}</p>
                    <div className="profileValueButton">
                        <Link to="/game/add-token">+</Link>
                    </div>
                </div>
            </div>
        )
    })
    
    return (
        <div className="profileInfoDisplay profileAssets profileBox">
            <h5>Assets</h5>
            {assetsList}
        </div>
    )
}

export default ProfileAssets