import React from "react";
import Screen from "./Screen";
import InGameCodeButtons from "./InGameCodeButtons";

const SelectCodePage = () => {
    return (
        <div className="codeSelection inGame">
            <div className="instruction">
                <h3>Select Your {4} Secret AGENTS</h3>
                <p>Click &#128065; To View Code</p>
            </div>
            <Screen />
            <InGameCodeButtons />
        </div>
    )
}

export default SelectCodePage