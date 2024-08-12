import React from "react";

const Arrow = ({arrowDirection}) => {
    return (
        <div class="arrow" style={{transform: `rotate(${arrowDirection}deg)`}}>
            <div class="arrowPack">
                <div class="arrowHolder">
                    <div class="arrowHead arrowParts"></div>
                    <div class="arrowBody arrowParts"></div>
                </div>
            </div>
        </div>
    )
}

export default Arrow