import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useAuthContext } from "./useAuthContext";

export const useUser = () => {
    const [errors, setErrors] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(null)

    const {user} = useAuthContext()
    const {currentPlayer, setCurrentPlayer, setCurrentPlayerOpponent,
        updateUserStates} = useUserContext()

    const getSessionUser = async (email, password) => {
        setIsLoading(true)
        setErrors({email: "", password: ""})

        const response = await fetch("/api/user", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setErrors(json.errors)
        }
        if (response.ok) {
            console.log("settin current user");
            // setting current user
            setIsLoading(false)
        }

        return json.user
    }

    const getUserOpponent = async (email, password) => {
        setIsLoading(true)
        setErrors({email: "", password: ""})

        const response = await fetch(`/api/user/opponent/${currentPlayer ? currentPlayer.inGame.opponent : null}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setErrors(json.errors)
        }
        if (response.ok) {
            console.log("settin current user");
            // setting current user
            setIsLoading(false)
        }

        return json.user
    }

    const setUserStates = async () => {
        const currentUserData = await getSessionUser()
        
        // update the user context
        updateUserStates(currentUserData)
    }
    
    const setOpponentStates = async () => {
        const currentUserOpponentData = await getUserOpponent()
        console.log(currentUserOpponentData);
        
        // update the user opponent context
        setCurrentPlayerOpponent(currentUserOpponentData)
    }

    return { getSessionUser, setUserStates, 
        getUserOpponent, setOpponentStates, errors}
}