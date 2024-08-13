import React from "react";
import FaceOffPage from "../reuseable/pages/FaceOffPage";

const LocalPlayHostPage = () => {
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
        name : "Riley",
        country: "UK",
        imgSrc: "../../../assets/images/faces/asta1.jpeg",
        connected: false,
        ready: false,
        host: false,
        join: true,
    }
    return (
        <FaceOffPage player={player} opponent={opponent}/>
    )
}

export default LocalPlayHostPage