import React, { createContext, useState, useReducer, useEffect } from 'react'

export const AuthContext = new createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            break;
    }
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log("AuthContext State: ", state);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
  
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider