import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const useFetch = (url, method) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const {user} = useAuthContext()

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })
            if (!response.ok) {
                const json = await response.json()
                setIsPending(false)
                setError(json) 
                throw Error('Could not fetch data from that resourse')
            }

            if (response.ok) {
                const json = await response.json()
                setData(json)
                setIsPending(false)
                setError(null)
            }
        }   

        if (user) fetchUser()
        
    }, [url, method, user])

    return { data, isPending, error}
}

export default useFetch