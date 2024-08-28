import React from "react";
import LanguageSettings from "./LanguageSettings";
import ThemeSetting from "./ThemeSetting";

const DisplaySettings = () => {

    return (
        <div className="settingsDisplay wrapper">
            <h4 className="settingsHeader">Display</h4>
            <LanguageSettings />
            <ThemeSetting />
        </div>
    )
}

export default DisplaySettings