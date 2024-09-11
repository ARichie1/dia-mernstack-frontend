import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUserContext";

const ProfileAssets = () => {
    const {assets} = useUserContext()

    const assetsList = assets ? assets.map(asset => {
        return (
            <div className="profileAsset profileInfo" key={Math.random()}>
                <p className="profileInfoTitle">{asset.title}</p>
                <div className="profileValueWrapper">
                    <p className="profileValue">{asset.balance}</p>
                    <div className="profileValueButton">
                        <Link to="/game/add-token">+</Link>
                    </div>
                </div>
            </div>
        )
    }) : null
    
    return (
        <div className="profileInfoDisplay profileAssets profileBox">
            <h5>Assets</h5>
            {assetsList}
        </div>
    )
}

export default ProfileAssets