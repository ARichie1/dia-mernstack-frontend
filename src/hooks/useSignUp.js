import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import useFetch from "./custom_hooks/useFetch";

export const useSignUp = () => {
    const [errors, setErrors] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const {getUserInfo} = useFetch()

    const signup = async (email, password) => {
        setIsLoading(true)
        setErrors({email: "", password: ""})

        const response = await fetch("/api/auth/user/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            console.log(json.errors);
            
            setErrors(json.errors)
            console.log(errors);
            
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(json))

            // update the auth context
            // dispatch({type: "LOGIN", payload: json})
            dispatch({type: "SET_USER_INFO", payload: {user: json, userInfo: await getUserInfo(json)}})

            setIsLoading(false)
        }
    }

    return { signup, isLoading, errors}
}