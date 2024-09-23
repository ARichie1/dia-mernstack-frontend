import React, { createContext, useState, useReducer, useEffect } from 'react'
import useFetch from '../hooks/custom_hooks/useFetch'

export const AuthContext = new createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null, userInfo: null}
        case "SET_USER_INFO":
            return {user: action.payload.user, userInfo: action.payload.userInfo}
        default:
            break;
    }
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    const {getUserInfo} = useFetch()

    const setUserFromLocalStorage = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
  
        if (user) {
            dispatch({type: "SET_USER_INFO", payload: {user, userInfo: await getUserInfo(user)}}) 
        }
    }

    console.log("AuthContext State: ", state);
    useEffect(() => {
        setUserFromLocalStorage()
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider