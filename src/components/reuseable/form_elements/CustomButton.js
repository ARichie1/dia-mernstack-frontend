import React, { useState } from "react";
import classes from "./CustomButton.module.css"

const CustomButton = ({ buttonAttr }) => {
    const action = () => {
        if (buttonAttr.action) buttonAttr.action()
        else return null
    }
    
    return (
        <button 
            type={buttonAttr.type ? buttonAttr.type : ""}
            name={buttonAttr.name ? buttonAttr.name : ""}
            className={buttonAttr.classes ? `${classes.customButton} ${buttonAttr.classes}`: `${classes.customButton}`} 
            onClick={ () => action() }
            disabled={buttonAttr.disabled ? true : buttonAttr.disabled}>
            { buttonAttr.title ? buttonAttr.title : "Custom Button" }
        </button>
    )
}

export default CustomButton