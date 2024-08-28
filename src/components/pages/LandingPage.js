import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../reuseable/form_elements/CustomButton";

const LandingPage = () => {

    return (
    <div className="mainWrapper">
        <div className="hero">
            <h1>WELCOME <br/> TO <br/> WTF</h1>
            <Link to="/game">
                <CustomButton buttonAttr = {
                    {title: "Let's Go The Fuvk", classes: "ctaButton"}
                }/>
            </Link>
        </div>
    </div> 
    )
}

export default LandingPage