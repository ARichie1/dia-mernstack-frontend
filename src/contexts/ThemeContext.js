import React, {createContext, useEffect, useState} from 'react'

export const ThemeContext = createContext()

const ThemeContextProvider = (props) => {
    const defaultColors = [
        {name: "background", color: "#333333", id: 1},
        {name: "header", color: "#000000", id: 2},
        {name: "headerFont", color: "#87ceeb", id: 3},
        {name: "theme", color: "#87ceeb", id: 4},
        {name: "themeFont", color: "#000000", id: 5}
    ]

    const [appColors, setAppColors] = useState(defaultColors)
    const [isLightMode, setIsLightMode] = useState(false)


    const toggleThemeMode = (mode) => {
        const modeUpdate = appColors.map(cc => { return cc })

        modeUpdate.forEach( muc => {
            console.log(isLightMode);
            if (isLightMode){ 
                if (muc.name === "background") muc.color = "#f8f8ff"
                if (muc.name === "themeFont") muc.color = "#f8f8ff"
            }else{
                if (muc.name === "background") muc.color = "#333333"
                if (muc.name === "themeFont") muc.color = "#000000"
            }
        })
        setAppColors(modeUpdate)
    }

    const changeCustomizableColors = (name, color) => {
        const colorUpdate = appColors.map(cc => { return cc })
        colorUpdate.forEach(cc => {
            if (cc.name === name) cc.color = color
        })
        setAppColors(colorUpdate)
    }

    const resetCustomizableColors = (name, color) => {
        setAppColors(defaultColors)
    }

    return (
        <ThemeContext.Provider value={{
            appColors, defaultColors, isLightMode, 
            setIsLightMode,
            toggleThemeMode, changeCustomizableColors,
            resetCustomizableColors
        }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider