import React from 'react'
import Arrow from '../reuseable/controls/Arrow'
import classes from './CodeAndResult.module.css'

const CodeAndResult = ({carAttr}) => {

    const codeList = carAttr.prediction.codes ? carAttr.prediction.codes.map( code => {
        return (
            <div className="codeImgWrapper innerWrapper" id="_7" key={Math.random()}>
                <img src={`../../../assets/images/faces/pa_${code.value}.png`} value="" alt=''/>
            </div>
        )
    }) : 
    carAttr.prediction.map( code => {
        return (
            <div className="codeImgWrapper innerWrapper" id="_7" key={Math.random()}>
                <img src={`../../../assets/images/faces/pa_${code.value}.png`} value="" alt=''/>
            </div>
        )
    })

    const resultList = carAttr.prediction.results ? carAttr.prediction.results.map( result => {
        return (
            <div className={`statusWrapper ${result.title} innerWrapper`} key={Math.random()}>
                <p className="statusText">{result.value}</p>
                <span className="statusEmoji">{result.emoji}</span>
            </div>
        )
    }) : null

    return (
        <div className={`codeAndResult ${carAttr.className}`}>
            {carAttr.type === "codes" ? (
                    <div className="outputsWrapper">
                        <div className="codeout outputs">{codeList}</div>
                    </div>
                ) : (
                    <div className="outputsWrapper">
                        <div className={"codeout outputs"}>{codeList}</div>
                        <div  className="arrowWrapper"><Arrow /></div>
                        <div className="result outputs">{resultList}</div>
                    </div>
                )
            }
        </div>       
    )
}

export default CodeAndResult