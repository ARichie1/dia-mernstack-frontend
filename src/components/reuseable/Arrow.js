import React from "react";

const Arrow = ({arrowDirection}) => {
    return (
        <div className="arrow" style={{transform: `rotate(${arrowDirection}deg)`}}>
            <div className="arrowPack">
                <div className="arrowHolder">
                    <div className="arrowHead arrowParts"></div>
                    <div className="arrowBody arrowParts"></div>
                </div>
            </div>
        </div>
    )
}

export default Arrow