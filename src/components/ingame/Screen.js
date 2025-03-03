import React, { useContext, useState } from 'react'
import CodeAndResult from './CodeAndResult'
import { GameContext } from '../../contexts/GameContext'
import { InGameContext } from '../../contexts/InGameContext'
import { useUserContext } from '../../hooks/useUserContext'

const Screen = () => {
    const { currentOpponent } = useUserContext()

    const {isInGame, isOutGame, codeSelection, isMultiplayer}  = useContext(GameContext)
    const {activePrediction, currentPrediction, playerPredictions, 
        opponentActivePrediction, opponentCurrentPrediction, opponentPredictions,
        showPlayerPredictions, showOpponentPredictions, 
        showOpponentScreen, setShowOpponentScreen,
        showOpponentCurrentPredictions} = useContext(InGameContext)

    // const createPlayerPredictions = () => {}
    const playerPredictionList = playerPredictions.map(plyPred => {
        return (
            <li key={Math.random()}><CodeAndResult carAttr={
                {prediction: plyPred,
                    type: "codesandresults",
                    showResult: true,
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
                    showResult: true,
                    class:"opponentPrediction"
                }}/></li>
        )
    })


    return (
        <div className="screen bottomContents">
            {isOutGame && <div className="codeShieldToggler">&#128065;</div>}
            {isMultiplayer && isInGame && <div className="opponentScreenToggler"
                onClick={() => setShowOpponentScreen(!showOpponentScreen)}>
                   <div className='togglerInner'>
                    &#128065;
                    <p>view {showOpponentScreen ? " your" : currentOpponent.username + "'s"} screen</p>
                   </div> 
                </div>
            }
            {isInGame && 
                <div className='inGameScreen screenWrapper'>
                    <div className="screenHeader screenChild">
                        <p className="codesHeader">AGENTS</p>
                        <p className="resultsHeader">RESULTS</p>
                    </div>

                    <div className="predictions screenChild">
                        <div className="predictionResults">
                            {!showOpponentScreen && 
                                <div className="currentPrediction display screen_display">
                                    <CodeAndResult carAttr={
                                        {prediction: currentPrediction,
                                            type: "codesandresults",
                                            showResult: true,
                                            class:"currentPredictionWrapper"
                                        }}/>
                                </div>
                            }

                            {isMultiplayer && showOpponentScreen && 
                                <div className="currentPrediction opponentCurrentPrediction display screen_display">
                                    {!showOpponentCurrentPredictions && <div className="activeGuess">
                                        <CodeAndResult carAttr={
                                            {prediction: opponentActivePrediction,
                                                type: "codes",
                                                showResult: true,
                                                class:"opponentActivePredictionWrapper"
                                            }}/>
                                    </div>}
                                    {showOpponentCurrentPredictions && <CodeAndResult carAttr={
                                        {prediction: opponentCurrentPrediction,
                                            type: "codesandresults",
                                            showResult: true,
                                            class:"opponentCurrentPredictionWrapper"
                                        }}/>}
                                </div>
                            }
                            

                            <div className="playerPredictions display screen_display multiplePredictions"
                                style={{right: `${showPlayerPredictions ? "0%" : "-100%"}`}}>
                                <ol className="playerPredictionWrapper">
                                    {playerPredictionList}
                                </ol>
                            </div>

                            {isMultiplayer && <div className="opponentPredictions display screen_display multiplePredictions"
                                style={{left: `${showOpponentPredictions ? "0%" : "-100%"}`}}>
                                <ol className="opponentPredictionWrapper">
                                    {opponentPredictionList}
                                </ol>
                            </div>}
                        </div>

                        <div className="activePrediction screen_display">
                            <div className="activeGuess">
                                <CodeAndResult carAttr={
                                    {prediction: activePrediction,
                                        type: "codes",
                                        showResult: false,
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
                        showResult: false,
                        class:"codeSelectionWrapper"
                    }}/>
            </div>}
        </div>
    )
}

export default Screen