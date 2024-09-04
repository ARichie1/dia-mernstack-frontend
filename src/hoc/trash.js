




let stageOne = []
let stageTwo = []

// for (let i = 0; i < levelsObject.length; i++) {
//     if (levelsObject[i].id <= 9) {
//        stageOne =  [...stageOne, levelsObject[i]]
//     } else if (levelsObject[i].id > 9 && levelsObject[i].id <= 18) {
//         stageTwo =  [...stageTwo, levelsObject[i]]   
//     }
// }

// const stageOneLvls = stageOne.map( lvl => {
//     return (
//         <div className="level toGame" id="singlePlayerMainGame" key={lvl.id}>{lvl.id}</div>                     
//     )
// })
// const stageTwoLvls = stageTwo.map( lvl => {
//     return (
//         <div className="level toGame" id="singlePlayerMainGame" key={lvl.id}>{lvl.id}</div>                     
//     )
// })


// background : {name: "background", color: "#888", id:1},
// header: {name: "header", color: "#444", id:2},
// headerFont: {name: "headerFont", color: "#000", id:3},
// theme: {name: "theme", color: "skyblue", id:4},
// themeFont: {name: "themeFont", color: "gold", id:5}


// const icons = [🥶,🕛🕵️‍♀️,🕵️‍♂️,🧙‍♂️,🧙‍♀️]


// const powerUps = [
//     {title : "timeFreezer", active : false, image: "timeFreezer.jpg ", duration : 5},
//     {title : "timeBooster", active : false, image: "timeBooster.jpeg", duration : 5},
//     {title : "moveBooster", active : false, image: "moveBooster.jpg", duration : 5},
//     {title : "detectiveMode", active : false, image: "detectiveMode.jpeg", duration : 5},
//     {title : "wizardMode", active : false, image: "wizardMode.jpg", duration : 5}
// ]

// const powerUpsList = powerUps.map( powerUp => {
//     return (
//         <div className={`powerUp ${powerUp.title} 
//             ${powerUp.active ? "powerUpActive" : "powerUpInActive"}}`}>
//             <div class="powerTime"></div>
//             <div className='imgWrapper'>
//                 <img src={`../../../assets/images/powerups/${powerUp.image}`} alt='powerUpImage'/>
//             </div>
//         </div>
//     )
// })

// return (
//     <div className="powerUpsWrapper">
//         <div class="powerUps">
//             <div className="powerUp powerUpsLoader">
//                 <div class="powerTime"></div>
//                 <div className='imgWrapper'>
//                     <img src={`../../../assets/images/powerups/powerUpsLoader.jpeg`} alt='powerUpImage'/>
//                 </div>
//             </div>
//             {powerUpsList}
//         </div>
//     </div>  
// )
// }

<div className="batch1 batch">
                    <button className="numbtn inGameBtn" data-sound="../sounds/0.wav" type="button">
                        <img id="_0_" src="assets/images/faces/pa_cyber_bully.png" />
                    </button>
                    <button className="numbtn inGameBtn" data-sound="../sounds/1.wav" type="button">
                        <img id="_1_" src="assets/images/faces/pa_naval_fireman.png" />
                    </button>
                    <button className="numbtn inGameBtn" data-sound="../sounds/2.wav" type="button">
                        <img id="_2_" src="assets/images/faces/pa_naval_chef.png" />
                    </button>
                </div>
                <div className="batch2 batch">
                    <button className="numbtn inGameBtn" data-sound="../sounds/3.wav" type="button">
                        <img id="_3_" src="assets/images/faces/pa_xmas_gangster.png" />
                    </button>
                    <button className="numbtn inGameBtn" data-sound="../sounds/4.wav" type="button">
                        <img id="_4_" src="assets/images/faces/pa_birthday_zombie.png" />
                    </button>
                    <button className="numbtn inGameBtn" data-sound="../sounds/5.wav" type="button">
                        <img id="_5_" src="assets/images/faces/pa_devil_wakanda.png" />
                    </button>
                </div>
                <div className="batch3 batch">
                    <button className="numbtn inGameBtn" data-sound="../sounds/6.wav" type="button">
                        <img id="_6_" src="assets/images/faces/pa_paid_tiger.png" />
                    </button>
                    <button className="numbtn inGameBtn" data-sound="../sounds/7.wav" type="button">
                        <img id="_7_" src="assets/images/faces/pa_paid_wakanda.png" />
                    </button>
                    <button className="numbtn inGameBtn" data-sound="../sounds/8.wav" type="button">
                        <img id="_8_" src="assets/images/faces/pa_savage_vikings.png" />
                    </button>
                </div>
                <div className="batch4 batch">
                    <button id="btnx1" className="numbtnReset inGameBtn" type="button">Reset</button>
                    <button className="numbtn inGameBtn" data-sound="../sounds/9.wav" type="button">
                        <img id="_9_" src="assets/images/faces/pa_red_indian.png" />
                    </button>
                    <button id="btnx2" className="numbtnSend inGameBtn" type="button">Check</button>
                </div>


                import React, { useState } from "react";
import Screen from "../../ingame/Screen";
import PowerUps from "../../ingame/PowerUps";
import InGameMenu from "../../ingame/InGameMenu";
import InGameCodeButtons from "../../ingame/InGameCodeButtons";

const GameScene = () => {

    const [display, setDisplay] = useState("currentPrediction")
    const [displayPositions, setDisplayPositions] = useState({
        oppPos: -100, curPos: 0, plyPos: -100
    })
    const setScreenDisplay = (screenDisplay) => {
        setDisplay(screenDisplay)
        if (display === "opponentPredictions"){
            setDisplayPositions({oppPos: 0, curPos: -100, plyPos: -200})
        }
        if (display === "currentPrediction"){
            setDisplayPositions({oppPos: -100, curPos: 0, plyPos: -100})
        }
        if (display === "playerPredictions"){
            setDisplayPositions({oppPos: -200, curPos: -100, plyPos: 0})
        }
    }
    return (
        <div className="inGame">
            <div className="opponentGuessesBtn guessesBtn inGameBtn"
                onClick={() => setScreenDisplay(display === "opponentPredictions" ? "currentPrediction" : "opponentPredictions")}>
                {display === "opponentPredictions" ? "O" : "C"}
            </div>
            <div className="playerGuessesBtn guessesBtn inGameBtn"
                onClick={() => setScreenDisplay(display === "playerPredictions" ? "currentPrediction" : "playerPredictions")}>
                {display === "playerPredictions" ? "P" : "C"}
            </div>

            <PowerUps />
            <InGameMenu />
            <Screen displayPositions={displayPositions}/>
            <InGameCodeButtons />
        </div>
    )
}

export default GameScene

<div class="codeout">
            <div class="codediv" id="_7">
                <img src="assets/images/faces/pa_paid_wakanda.png" value="7" class="code">
            </div>
            <div class="codediv" id="_4">
                <img src="assets/images/faces/pa_birthday_zombie.png" value="4" class="code">
            </div><div class="codediv" id="_8">
                <img src="assets/images/faces/pa_savage_vikings.png" value="8" class="code">
            </div>
        </div>
          <div class="arrow">
            <div class="arrowPack">
              <div class="arrowHolder">
                <div class="arrowHead arrowParts"></div>
                <div class="arrowBody arrowParts"></div>
              </div>
            </div>
          </div>
          <div class="result">
            <div class="status alive">
                <p class="statusText">A</p>
                <span class="statusEmoji">😇</span>
            </div>
            <div class="status alive">
                <p class="statusText">A</p>
                <span class="statusEmoji">😇</span>
            </div>
            <div class="status alive">
                <p class="statusText">A</p>
                <span class="statusEmoji">😇</span>
            </div>
        </div>
        </div>

        <CodeAndResult carAttr={
            {code:"1234", result:"aadi",
                class:"currentPredictionWrapper"
            }}/>

            
            <div className="codeout">1234</div>


            const [activePrediction, setActivePrediction] = useState([
                {value: "paid_wakanda", btn_id: 7, id: 0},
                {value: "paid_wakanda", btn_id: 3, id: 1},
                {value: "paid_wakanda", btn_id: 2, id: 2},
                {value: "paid_wakanda", btn_id: 6, id: 3}
            ]) 