import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../reuseable/form_elements/CustomButton";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUser } from "../../hooks/useUser";

const LandingPage = () => {
    const { user } = useAuthContext()
    const {setUserStates} = useUser()

    return (
    <div className="mainWrapper">
        <div className="hero">
            <h1>WELCOME <br/> TO <br/> D . I . A <br/><br/> DEAD💀 INJURED🤕 ALIVE😁</h1>
            <Link 
                to={user ? "/game" : "/login"}
                onClick={() => user ? setUserStates() : null}>
                <CustomButton buttonAttr = {
                    {title: "Let's Go", classes: "ctaButton"}
                }/>
            </Link>
        </div>
    </div> 
    )
}

export default LandingPage