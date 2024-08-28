import React, { createContext, useState } from 'react'

export const AppGlobalVariableContext = new createContext()

const AppGlobalVariableContextProvider = (props) => {
    const appName = "WTF"
    const imgFolder = "../../../assets/images/faces/"

    const [defaultImages, setDefaultImages] = useState([
        {name: "hulk.jpg", pos: 200, id:0}, 
        {name: "gow.jpg", pos: 300, id:1},
        {name: "asta3.jpeg", pos: 0, id:2}, 
        {name: "asta2.jpeg", pos: 100, id:3},
        {name: "hulk.jpg", pos: 400, id:4}, 
        {name: "hater.jpg", pos: 500, id:5}, 
        {name: "hulk.jpg", pos: 600, id:6},
        {name: "gow.jpg", pos: 700, id:7},
        {name: "hater.jpg", pos: 800, id:8}
    ])

    return (
        <AppGlobalVariableContext.Provider value={{
            appName, imgFolder,
            defaultImages, setDefaultImages
        }}>
            {props.children}
        </AppGlobalVariableContext.Provider>
    )
}

export default AppGlobalVariableContextProvider