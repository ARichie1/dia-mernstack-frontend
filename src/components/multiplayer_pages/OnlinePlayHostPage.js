import React from "react";
import FaceOffPage from "../reuseable/pages/FaceOffPage";

const OnlinePlayHostPage = () => {
    const player = {
        name : "Richie",
        country: "NGA",
        imgSrc: "../../../assets/images/faces/asta3.jpeg",
        connected: true,
        ready: false,
        host: true,
        join: false,
    }

    const opponent = {
        name : "Max",
        country: "USA",
        imgSrc: "../../../assets/images/faces/asta2.jpeg",
        connected: true,
        ready: false,
        host: false,
        join: true,
    }

    return (
        <FaceOffPage player={player} opponent={opponent}/>
    )
}

export default OnlinePlayHostPage