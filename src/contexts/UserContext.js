import React, { createContext } from 'react'
import useFetch from '../custom_hooks/useFetch'

export const UserContext = new createContext()

const UserContextProvider = ({children}) => {
    const { data: currentUser, isPending, error } = useFetch("/api/user", "GET")
    
    return (
        <UserContext.Provider value={{
            currentUser, isPending, error
        }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider