import React from 'react'
import CodeAndResult from './CodeAndResult'

const Screen = () => {
    return (
        <div class="screen bottomContents">
            <div class="screenHeader screenChild">
                <p class="codesHeader">AGENTS</p>
                <p class="resultsHeader">RESULTS</p>
            </div>

            <div class="predictions screenChild">
                <div className="predictionResults">
                    <div class="opponentPredictions display multiplePredictions">
                        <ol className="opponentPredictionWrapper">
                            <li><CodeAndResult carAttr={
                                {code:"1234", result:"aadi",
                                    class:"opponentPrediction"
                                }}/></li>
                        </ol>
                    </div>

                    <div class="currentPrediction display">
                        <CodeAndResult carAttr={
                            {code:"1234", result:"aadi",
                                class:"currentPredictionWrapper"
                            }}/>
                    </div>

                    <div class="yourPredictions display multiplePredictions">
                    <ol className="yourPredictionWrapper">
                        <li><CodeAndResult carAttr={
                            {code:"1234", result:"aadi",
                                class:"yourPrediction"
                            }}/></li>
                    </ol>
                    </div>
                </div>

                <div class="activePrediction">
                    <div class="activeGuess">
                        <div className="codeout">1234</div>
                    </div>
                    <CodeAndResult carAttr={
                        {code:"1234", result:"aadi",
                            class:"hintPredicted"
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default Screen