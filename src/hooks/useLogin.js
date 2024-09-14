import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [errors, setErrors] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setErrors({email: "", password: ""})

        const response = await fetch("/api/auth/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setErrors(json.errors)
        }
        if (response.ok) {
            console.log("loggin");
            // save the user to local storage
            localStorage.setItem("user", JSON.stringify(json))

            // update the auth context
            dispatch({type: "LOGIN", payload: json})

            setIsLoading(false)
        }
    }

    return { login, isLoading, errors}
}