import React, { useState, useEffect } from "react";

const useFetch = () => {
    const [data, setData] = useState(null)
    const [errors, setErrors] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(null)

    const getUserInfo = async (user) => {    
        setIsLoading(true)
        setErrors({email: "", password: ""})

        const response = await fetch("http://localhost:4000/api/user", {
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
            setData(json.user)
            // setting current user
            setIsLoading(false)
        }
        
        return json.user
    }

    return {getUserInfo}
}

export default useFetch