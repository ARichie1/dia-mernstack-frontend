import React, { createContext, useState } from 'react'

export const InGamePlayContext = new createContext()

const InGamePlayContextProvider = (props) => {


    return (
        <InGamePlayContext.Provider value={{

        }}>
            {props.children}
        </InGamePlayContext.Provider>
    )
}

export default InGamePlayContextProvider