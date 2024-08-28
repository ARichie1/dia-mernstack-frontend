import React, { useState, useContext } from "react";
import Switch from "../reuseable/controls/Switch";
import { ThemeContext } from "../../contexts/ThemeContext";

const ThemeSetting = () => {
    const { appColors, isLightMode, setIsLightMode, 
        toggleThemeMode, changeCustomizableColors,
        resetCustomizableColors} = useContext(ThemeContext)

    const [canCustomize, setCanCustomize] = useState(false)
    const customizableColorsList = appColors.map(customizableColor => {
        return (
            <li className={`customizableColor ${customizableColor.name}Color`} key={customizableColor.id}>
                <p>{customizableColor.name} Color</p>
                <input type="color" 
                    name="color" 
                    value={customizableColor.color}
                    onChange={(e) => changeCustomizableColors(customizableColor.name, e.target.value)}
                    />
            </li>
        )
    })

    return (
        <div className="displayTheme displayBox">
            <div className="displayThemeDark themeToggler theme">
                <p className="settingHeader">
                    Switch To {isLightMode ? "Dark" : "Light"} Mode
                </p>
                <Switch switchAttr={{ 
                    title: "ThemeMode", parent: "ThemeToggler", 
                    classes: "themeModeSwitch", 
                    action: [setIsLightMode, toggleThemeMode],
                    state: false, id: 1}}/>
            </div>

            <div className="themeCustomizer">
                <div className="themeCustomizerHeader">
                    <p className="settingHeader">Customize</p>
                    <Switch switchAttr={{ 
                        title: "customizeMode", parent: "customizeToggler", 
                        classes: "customizeModeSwitch",
                        action: [setCanCustomize], 
                        state: false, id: 2}}/>
                </div>

                {canCustomize && <ul>{customizableColorsList}</ul>}
                {canCustomize && <div className="resetCustomColors" 
                    onClick={() => resetCustomizableColors()}>
                    <p>Reset</p><span>&#10055;</span>
                </div>}
            </div>
        </div>
    )
}

export default ThemeSetting