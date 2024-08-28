import React, { useState } from 'react'
import classes from "./Switch.module.css"

const Switch = ({switchAttr}) => {
    const [isOn, setIsOn] = useState(switchAttr.state)

    const switchAction = () => {
        setIsOn(!isOn)
        
        if (switchAttr.action) {
            
            if (switchAttr.action.length < 2) {
                switchAttr.action[0](!isOn)
            }else{
                switchAttr.action.forEach(action => {
                    action(!isOn)
                });
            }
        }
        else return null
    }

    return (
        <div className={`${classes.switch} ${switchAttr.classes}`}>
            <div className={`${classes.switchInner}`}>
                <div 
                    className={`${classes.switchButton} ${isOn ? classes.switchOn : classes.switchOff}`} 
                    id={switchAttr.parent}
                    onClick={() => switchAction()}>
                </div>
            </div>
        </div>
    )
}

export default Switch