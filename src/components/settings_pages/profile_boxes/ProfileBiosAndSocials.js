import React from "react";
import { Link } from "react-router-dom";

const ProfileBiosAndSocials = () => {
    const bios = [
        {title: "email", value: "max...azer@gmail.com", id:1},
        {title: "username", value: "maxwell", id:2},
        {title: "country", value: "usa", id:3}
    ]
    
    const socials = [
        {title: "twitter", value: "maxwell", id:1},
        {title: "discord", value: "0xmaxwell400", id:2},
        {title: "telegram", value: "maxwell0004", id:3},
        {title: "steam", value: "maxwell400", id:4},
        {title: "twitch", value: "maxwell400", id:5},
        {title: "epic games", value: "maxwell400_epic", id:6}
    ]
    const biosList = bios.map(bio => {
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

    const socialsList = socials.map(social => {
        return (
            <div className="profileSocial profileInfo" key={social.id}>
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