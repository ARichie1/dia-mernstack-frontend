import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import useFetch from "./custom_hooks/useFetch";

export const useLogin = () => {
    const [errors, setErrors] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const {getUserInfo} = useFetch()

    const login = async (email, password) => {
        setIsLoading(true)
        setErrors({email: "", password: ""})
        console.log(email, password);
        

        const response = await fetch("http://localhost:4000/api/auth/user/login", {
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
            // dispatch({type: "LOGIN", payload: json})
            console.log(json);
            
            dispatch({type: "SET_USER_INFO", payload: {user: json, userInfo: await getUserInfo(json)}})

            setIsLoading(false)
        }
    }

    return { login, isLoading, errors}
}