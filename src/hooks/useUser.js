import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useAuthContext } from "./useAuthContext";

export const useUser = () => {
    const [errors, setErrors] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(null)

    const {user} = useAuthContext()
    const {setCurrentUser, updateUserStates} = useUserContext()

    const setSessionUser = async (email, password) => {
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

    const setUserStates = async () => {
        const currentUserData = await setSessionUser()
        
        // update the user context
        updateUserStates(currentUserData)
        setCurrentUser(currentUserData)
    }

    return { setSessionUser, setUserStates, errors}
}