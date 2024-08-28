import React, { createContext, useState } from 'react'

export const AppGlobalVariableContext = new createContext()

const AppGlobalVariableContextProvider = (props) => {


    return (
        <AppGlobalVariableContext.Provider value={{

        }}>
            {props.children}
        </AppGlobalVariableContext.Provider>
    )
}

export default AppGlobalVariableContextProvider