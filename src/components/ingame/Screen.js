import React, { useContext, useState } from 'react'
import CodeAndResult from './CodeAndResult'
import { GameContext } from '../../contexts/GameContext'
import { InGameContext } from '../../contexts/InGameContext'

const Screen = ({showOpponentPredictions, showPlayerPredictions}) => {

    const {isInGame, isOutGame, codeSelection}  = useContext(GameContext)
    const {activePrediction, currentPrediction, playerPredictions, 
        opponentPredictions}  = useContext(InGameContext)

    // const sendActivePrediction = () => {}

    // const createPlayerPredictions = () => {}
    const playerPredictionList = playerPredictions.map(plyPred => {
        return (
            <li key={Math.random()}><CodeAndResult carAttr={
                {prediction: plyPred,
                    type: "codesandresults",
                    class:"playerPrediction"
                }}/></li>
        )
    })

    // const createOpponentPredictions = () => {}
    const opponentPredictionList = opponentPredictions.map(oppPred => {
        return (
            <li key={Math.random()}><CodeAndResult carAttr={
                {prediction: oppPred,
                    type: "codesandresults",
                    class:"opponentPrediction"
                }}/></li>
        )
    })


    return (
        <div className="screen bottomContents">
            {isOutGame && <div className="codeShieldToggler">&#128065;</div>}
            {isInGame && 
                <div className='inGameScreen screenWrapper'>
                    <div className="screenHeader screenChild">
                        <p className="codesHeader">AGENTS</p>
                        <p className="resultsHeader">RESULTS</p>
                    </div>

                    <div className="predictions screenChild">
                        <div className="predictionResults">
                            <div className="currentPrediction display screen_display">
                                <CodeAndResult carAttr={
                                    {prediction: currentPrediction,
                                        type: "codesandresults",
                                        class:"currentPredictionWrapper"
                                    }}/>
                            </div>

                            <div className="playerPredictions display screen_display multiplePredictions"
                                style={{right: `${showPlayerPredictions ? "0%" : "-100%"}`}}>
                                <ol className="playerPredictionWrapper">
                                    {playerPredictionList}
                                </ol>
                            </div>
                            <div className="opponentPredictions display screen_display multiplePredictions"
                                style={{left: `${showOpponentPredictions ? "0%" : "-100%"}`}}>
                                <ol className="opponentPredictionWrapper">
                                    {opponentPredictionList}
                                </ol>
                            </div>
                        </div>

                        <div className="activePrediction screen_display">
                            <div className="activeGuess">
                                <CodeAndResult carAttr={
                                    {prediction: activePrediction,
                                        type: "codes",
                                        class:"activePredictionWrapper"
                                    }}/>
                            </div>
                            {/*<CodeAndResult carAttr={
                                {code:"1234", result:"aadi",
                                    class:"hintPredicted"
                                }}/>*/}
                        </div>
                    </div>
                </div>}

            {isOutGame  && <div className="codeSelectionScreen screenWrapper">
                <CodeAndResult carAttr={
                    {prediction: codeSelection,
                        type: "codes",
                        class:"codeSelectionWrapper"
                    }}/>
            </div>}
        </div>
    )
}

export default Screen