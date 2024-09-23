import React, { createContext, useState } from 'react'

export const AppGlobalVariableContext = new createContext()

const AppGlobalVariableContextProvider = (props) => {
    const appName = "WTF"
    const assetsFolder = "http://localhost:3000/assets/"
    const imgFolder = "../../../assets/images/faces/"

    const defaultImage = "hulk.jpg"
    const [defaultImages, setDefaultImages] = useState([
        {value: "hulk.jpg", pos: 200, posId: 0, id:0}, 
        {value: "gow.jpg", pos: 300, posId: 1, id:1},
        {value: "asta3.jpeg", pos: 0, posId: 2, id:2}, 
        {value: "asta2.jpeg", pos: 100, posId: 3, id:3},
        {value: "hulk.jpg", pos: 400, posId: 4, id:4}, 
        {value: "hater.jpg", pos: 500, posId: 5, id:5}, 
        {value: "hulk.jpg", pos: 600, posId: 6, id:6},
        {value: "gow.jpg", pos: 700, posId: 7, id:7},
        {value: "hater.jpg", pos: 800, posId: 8, id:8}
    ])

    const [showNavBlock, setShowNavBlock] = useState(true)
    
    return (
        <AppGlobalVariableContext.Provider value={{
            appName, assetsFolder,
            imgFolder, defaultImage,
            defaultImages, setDefaultImages,
            showNavBlock, setShowNavBlock
        }}>
            {props.children}
        </AppGlobalVariableContext.Provider>
    )
}

export default AppGlobalVariableContextProvider