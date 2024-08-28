import React, { useState } from 'react'
import CustomForm from '../reuseable/form_elements/CustomForm'

const SignUpPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const formInputs = [
        {type: 'email', name:'email', title: 'email', value: email, setValue: setEmail, id: 1},
        {type: 'password', name:'password', title: 'password', value: password, setValue: setPassword, id: 2},
    ]

    return (
        <div className="mainWrapper">
            <CustomForm 
                formAttr={{title : 'Sign Up Form'}}  
                formInputs={formInputs} 
                buttonAtrributes={{title: "Sign Up"}} 
            />
        </div>
    )
}

export default SignUpPage