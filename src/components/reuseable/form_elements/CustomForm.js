import React from "react";
import classes from './CustomForm.module.css'
import CustomButton from "./CustomButton";

const CustomForm = ({formAttr, formInputs, buttonAtrributes}) => {

    const defaultformInputs = [
        {type: 'email', name:'email', title: 'email', value: "", setValue: null},
        {type: 'password', name:'password', title: 'password', value: "", setValue: null},
    ]

    formInputs = !formInputs ? defaultformInputs : formInputs

    const formInputList = formInputs.map( attr => {
        return (
            <li key={attr.id}>
                <label>{attr.title}</label>
                <input 
                    type={attr.type} 
                    name={attr.name} 
                    value={attr.value !== "" ? attr.value : ""}
                    onChange={attr.setValue ? (e) => attr.setValue(e.target.value) : null}
                />
                {attr.error && <div>{attr.error}</div>}
            </li>
        )
    })

    return (
        <form className={`${classes.customForm} ${formAttr.class ? formAttr.class : ""}`} 
            style={{width: `${formAttr.width ? formAttr.width : "400px"}`, 
                height: `${formAttr.height ? formAttr.height : "auto"}`}}
                onSubmit={formAttr.action}>
            <h5 className="formTitle">{formAttr.title}</h5>
            <ul className={classes.inputsWrapper}>
                {formInputList}
            </ul> 
            <CustomButton buttonAttr = {
                {
                    title: buttonAtrributes.title,
                    type: "submit",
                    name: "submit",
                    disabled: formAttr.isLoading
                }
            }/>
        </form>
    )
}

export default CustomForm