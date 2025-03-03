import React, { useEffect } from 'react'
import Arrow from '../reuseable/controls/Arrow'
import classes from './CodeAndResult.module.css'

const CodeAndResult = ({carAttr}) => {
    const generateCodeWrappers = (codeArray) => {
        let list = codeArray.map( code => {
            return (
                <div className="codeImgWrapper innerWrapper" id="_7" key={Math.random()}>
                    <img src={`../../../assets/images/faces/pa_${code.value}.png`} value="" alt=''/>
                </div>
            )
        })
        return list
    }
    const generateCodeandResultList = () => {
        let codeList, resultList

        if(carAttr){
            if (carAttr.prediction) {
                if (carAttr.prediction.codes){
                    codeList = generateCodeWrappers(carAttr.prediction.codes)
                }
                else if (carAttr.prediction[0]) {
                    codeList = generateCodeWrappers(carAttr.prediction)
                }

                if (carAttr.prediction.results) {
                    resultList = carAttr.prediction.results.map( result => {
                        return (
                            <div className={`statusWrapper ${result.title} innerWrapper`} key={Math.random()}>
                                <p className="statusText">{result.value}</p>
                                <span className="statusEmoji">{result.emoji}</span>
                            </div>
                        )
                    })
                }
            }
        }

        return {codeList, resultList}
    }

    const {codeList, resultList} = generateCodeandResultList()

    return (
        <div className={`codeAndResult ${carAttr.className}`}>
            {carAttr.type === "codes" ? (
                    <div className="outputsWrapper">
                        <div className="codeout outputs">{codeList}</div>
                    </div>
                ) : (
                    <div className="outputsWrapper">
                        <div className={"codeout outputs"}>{codeList}</div>
                        {carAttr.showResult && <div  className="arrowWrapper"><Arrow /></div>}
                        {carAttr.showResult && <div className="result outputs">{resultList}</div>}
                    </div>
                )
            }
        </div>       
    )
}

export default CodeAndResult