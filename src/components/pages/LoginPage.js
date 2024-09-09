import React, { useState } from 'react'
import CustomForm from '../reuseable/form_elements/CustomForm'
import { useLogin } from '../../hooks/useLogin'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, errors, isLoading } = useLogin()

    const formInputs = [
        {type: 'email', name:'email', 
            title: 'email', value: email, 
            error: errors.email,
            setValue: setEmail, id: 1},
        {type: 'password', name:'password', 
            title: 'password', value: password, 
            error: errors.password,
            setValue: setPassword, id: 2},
    ]

    const handleSubmit = async (e) => {
        e.preventDefault() 
        await login(email, password)
    }

    return (
        <div className="mainWrapper">
            <CustomForm 
                formAttr={{title : 'Log In Form',
                    action: handleSubmit
                }}  
                formInputs={formInputs} 
                buttonAtrributes={{title: "login"}} 
            />
        </div>
    )
}

export default LoginPage