import React from "react";
import classes from "./Arrow.module.css"

const Arrow = ({arrowDirection}) => {
    return (
        <div className={classes.arrow} style={{transform: `rotate(${arrowDirection}deg)`}}>
            <div className={classes.arrowPack}>
                <div className={classes.arrowHolder}>
                    <div className={`${classes.arrowHead} ${classes.arrowParts}`}></div>
                    <div className={`${classes.arrowBody} ${classes.arrowParts}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Arrow