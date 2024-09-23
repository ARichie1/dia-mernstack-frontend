import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../hooks/useUserContext";

const ProfileBiosAndSocials = () => {
    const {bios, socials} = useUserContext()

    const biosList = bios ? bios.map(bio => {
        return (
            <div className="profileBio profileInfo" key={bio.id}>
                <p className="profileInfoTitle">{bio.title}</p>
                <div className="profileValueWrapper">
                    <p className="profileValue">{bio.value}</p>
                    <div className="profileValueButton">
                        <Link to="">🖊</Link>
                    </div>
                </div>
            </div>
        )
    })
    : null
    
    const socialsList = socials ? socials.map(social => {
        return (
            <div className="profileSocial profileInfo" key={Math.random()}>
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
    : null

    return (
        <div className="profileInfoDisplay profileBiosAndSocials profileBox">
            <h5>Bio</h5>
            {biosList}
            <br />
            <h5>Socials</h5>
            {socialsList}
        </div>
    )
}

export default ProfileBiosAndSocials