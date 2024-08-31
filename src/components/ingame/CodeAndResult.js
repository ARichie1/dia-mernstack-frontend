import React from 'react'
import Arrow from '../reuseable/controls/Arrow'
import classes from './CodeAndResult.module.css'

const CodeAndResult = ({carAttr}) => {
    return (
        <div className={`${classes.codeAndResult} ${carAttr.class}`}>
            <div className={`codeout ${classes.outputsWrapper}`}>{carAttr.code}</div>
            <div  className={`${classes.arrowWrapper}`}><Arrow /></div>
            <div className={`result ${classes.outputsWrapper}`}>{carAttr.result}</div>
        </div>
    )
}

export default CodeAndResult