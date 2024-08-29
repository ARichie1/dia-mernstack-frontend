import React, { createContext } from 'react'

export const InGameContext = new createContext()

const InGameContextProvider = (props) => {


    return (
        <InGameContext.Provider value={{

        }}>
            {props.children}
        </InGameContext.Provider>
    )
}

export default InGameContextProvider