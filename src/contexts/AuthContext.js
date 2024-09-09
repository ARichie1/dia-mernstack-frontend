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

// const AuthContextProvider = (props) => {

//     const [isAuthenticated, setIsAuthenticated] = useState(false)
//     const [profileImage, setProfileImage] = useState({name: "gow.jpg", pos: 300, id:3})
//     const [rank, setRank] = useState(600)
//     const [team, setTeam] = useState("Mozart Squard")
//     const [keys, setKeys] = useState(9)
//     const [tokens, setTokens] = useState(100)
//     const [usdt, setUsdt] = useState(100)
//     const [opponentProfileImage, setOpponentProfileImage] = useState({name: "asta2.jpeg", pos: 300, id:3})
    

//     const toggleAuth = () => {
//         setIsAuthenticated(!isAuthenticated)
//     }

//     return (
//         <AuthContext.Provider value={{
//             profileImage, setProfileImage,
//             rank, setRank,
//             team, setTeam,
//             keys, setKeys,
//             tokens, setTokens, 
//             usdt, setUsdt,
//             opponentProfileImage, setOpponentProfileImage,
//             isAuthenticated, toggleAuth 
//         }}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }

export default AuthContextProvider