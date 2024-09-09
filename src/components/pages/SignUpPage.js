import React, { useState } from 'react'
import CustomForm from '../reuseable/form_elements/CustomForm'
import { useSignUp } from '../../hooks/useSignUp'

const SignUpPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, errors, isLoading } = useSignUp() 

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
        await signup(email, password)
    }

    return (
        <div className="mainWrapper">
            <CustomForm 
                formAttr={
                    {title : 'Sign Up Form',
                        action: handleSubmit
                    }}  
                formInputs={formInputs} 
                buttonAtrributes={{title: "Sign Up"}} 
            />
        </div>
    )
}

export default SignUpPage