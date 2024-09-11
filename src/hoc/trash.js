




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


            let codeButtons = [
                {value: "cyber_bully", type: "numBtn", active: false, clickState: 0, id: 0},
                {value: "naval_fireman", type: "numBtn", active: false, clickState: 0, id: 1},
                {value: "naval_chef", type: "numBtn", active: false, clickState: 0, id: 2},
                {value: "xmas_gangster", type: "numBtn", active: false, clickState: 0, id: 3},
                {value: "birthday_zombie", type: "numBtn", active: false, clickState: 0, id: 4},
                {value: "devil_wakanda", type: "numBtn", active: false, clickState: 0, id: 5},
                {value: "paid_tiger", type: "numBtn", active: false, clickState: 0, id: 6},
                {value: "paid_wakanda", type: "numBtn", active: false, clickState: 0, id: 7},
                {value: "savage_vikings", type: "numBtn", active: false, clickState: 0, id: 8},
                {value: "reset", type: "numBtnReset", active: false, clickState: 0, id: 10},
                {value: "red_indian", type: "numBtn", active: false, clickState: 0, id: 9}
            ]

            const sortArrayById = (array) => {
                let sortedArray = array
                sortedArray.forEach(element => {
                    sortedArray[element.id] = element
                })
                return sortedArray
            }
            // console.log(codeButtons);
            // codeButtons = sortArrayById(codeButtons)
            // console.log(codeButtons);



            setTimeout(() => {
                isOutGame ? 
                    console.log(codeSelection.length)
                    : console.log(activePrediction.length)
            }, 1000);
            import React, { createContext, useState } from 'react'

            export const InGameContext = new createContext()
            
            const InGameContextProvider = (props) => {
                const [activePrediction, setActivePrediction] = useState([]) 
                
                const [currentPrediction, setCurrentPrediction] = useState(
                    {codes: [
                        {value: "paid_wakanda", btn_id: 7, id: 0},
                        {value: "paid_wakanda", btn_id: 3, id: 1},
                        {value: "paid_wakanda", btn_id: 2, id: 2},
                        {value: "paid_wakanda", btn_id: 6, id: 3}
                    ], 
                    results: [
                        {title: "dead", value: "D", emoji: "💀", id: 0},
                        {title: "dead", value: "D", emoji: "💀", id: 1},
                        {title: "injured", value: "I", emoji: "🤕", id: 2},
                        {title: "alive", value: "A", emoji: "😁", id: 3},
                    ], 
                    id: 0}
                ) 
                const [playerPredictions, setPlayerPredictions] = useState([
                    {codes: [
                        {value: "paid_wakanda", btn_id: 7, id: 0},
                        {value: "paid_wakanda", btn_id: 3, id: 1},
                        {value: "paid_wakanda", btn_id: 2, id: 2},
                        {value: "paid_wakanda", btn_id: 6, id: 3}
                    ], 
                    results: [
                        {title: "dead", value: "D", emoji: "💀", id: 0},
                        {title: "dead", value: "D", emoji: "💀", id: 1},
                        {title: "injured", value: "I", emoji: "🤕", id: 2},
                        {title: "alive", value: "A", emoji: "😁", id: 3},
                    ], 
                    id: 0},
                    {codes: [
                        {value: "paid_wakanda", btn_id: 7, id: 0},
                        {value: "paid_wakanda", btn_id: 3, id: 1},
                        {value: "paid_wakanda", btn_id: 2, id: 2},
                        {value: "paid_wakanda", btn_id: 6, id: 3}
                    ], 
                    results: [
                        {title: "dead", value: "D", emoji: "💀", id: 0},
                        {title: "dead", value: "D", emoji: "💀", id: 1},
                        {title: "injured", value: "I", emoji: "🤕", id: 2},
                        {title: "alive", value: "A", emoji: "😁", id: 3},
                    ], 
                    id: 1}
                ]) 
                const [opponentPredictions, setOpponentPredictions] = useState([
                    {codes: [
                        {value: "paid_wakanda", btn_id: 7, id: 0},
                        {value: "paid_wakanda", btn_id: 3, id: 1},
                        {value: "paid_wakanda", btn_id: 2, id: 2},
                        {value: "paid_wakanda", btn_id: 6, id: 3}
                    ], 
                    results: [
                        {title: "dead", value: "D", emoji: "💀", id: 0},
                        {title: "dead", value: "D", emoji: "💀", id: 1},
                        {title: "injured", value: "I", emoji: "🤕", id: 2},
                        {title: "alive", value: "A", emoji: "😁", id: 3},
                    ], 
                    id: 0},
                    {codes: [
                        {value: "paid_wakanda", btn_id: 7, id: 0},
                        {value: "paid_wakanda", btn_id: 3, id: 1},
                        {value: "paid_wakanda", btn_id: 2, id: 2},
                        {value: "paid_wakanda", btn_id: 6, id: 3}
                    ], 
                    results: [
                        {title: "dead", value: "D", emoji: "💀", id: 0},
                        {title: "dead", value: "D", emoji: "💀", id: 1},
                        {title: "injured", value: "I", emoji: "🤕", id: 2},
                        {title: "alive", value: "A", emoji: "😁", id: 3},
                    ], 
                    id: 1}
                ]) 
            
                return (
                    <InGameContext.Provider value={{
                        activePrediction, setActivePrediction,
                        currentPrediction, setCurrentPrediction,
                        playerPredictions, setPlayerPredictions,
                        opponentPredictions, setOpponentPredictions
                    }}>
                        {props.children}
                    </InGameContext.Provider>
                )
            }
            
            export default InGameContextProvider


const socials = [
        {title: "twitter", value: "maxwell", id:1},
        {title: "discord", value: "0xmaxwell400", id:2},
        {title: "telegram", value: "maxwell0004", id:3},
        {title: "steam", value: "maxwell400", id:4},
        {title: "twitch", value: "maxwell400", id:5},
        {title: "epic games", value: "maxwell400_epic", id:6}
    ]
const gamePlaySocials = [
    {title: "rank", value: 700, badge: "silver", id:1},
    {title: "team", value: "mozart squad", badge: "vice-captain", id:2}
]
const singlePlayerGamePlayHistories = [
    {title: "vs computer", gameplayed: 50, wins: 36, losses:14, id:1},
    {title: "survival mode", gameplayed: 10, wins: 2, losses:7, id:2},
    {title: "story mode", gameplayed: 22, wins:22, losses:50, id:3},
]
const multiplayerGamePlayHistories = [
    {
        title: "offline multiplayer", 
        total: {gameplayed: 39, wins: 30, losses:9},
        whenHost: {gameplayed: 20, wins: 16, losses:4}, 
        whenJoin: {gameplayed: 19, wins: 12, losses:7}, 
        id:1
    },
    {
        title: "online multiplayer",
        total: {gameplayed: 30, wins: 25, losses:5},
        whenHost: {gameplayed: 18, wins: 10, losses:8}, 
        whenJoin: {gameplayed: 12, wins: 8, losses:4}, 
        id:2
    }
]




 
const playerDefaultValue = {
    email: "",
    password: "",
    username: "user",
    country: "usa",
    profilePic: {value: "gow.jpg", pos: 300},
    socials: {
        twitter: {title: "twitter", value: ""},
        discord: {title: "discord", value: ""},
        telegram: {title: "telegram", value: ""},
        twitch: {title: "twitch", value: ""},
        steam: {title: "steam", value: ""},
        epicGames: {title: "epic games", value: ""}
    },
    finance : {
        address : "",
        keys : {
            balance : 9,
            depositHistory : [
                {
                    token : "keys", 
                    chain : "polygon",
                    depositType : "swap",
                    senderAddress : "", 
                    unitDeposited : 5
                },
                {
                    token : "keys", 
                    chain : "polygon",
                    depositType : "swap",
                    senderAddress : "", 
                    unitDeposited : 5
                },
                {
                    token : "keys", 
                    chain : "polygon",
                    depositType : "swap",
                    senderAddress : "", 
                    unitDeposited : 5
                }
            ]
        },
        dia : {
            balance : 100,
            depositHistory : [
                {
                token : "usdt", 
                chain : "polygon",
                depositType : "swap",
                senderAddress : "0x522789456...32c", 
                unitDeposited : 1000, 
                "timeStamp" : "August 9 2024, 11:00 pm GMT"
                }
            ]
        },
        usdt : {
            balance : 150,
            depositHistory : [
                {
                token : "usdt", 
                chain : "polygon",
                depositType : "deposit",
                senderAddress : "0x34562424...32c", 
                unitDeposited : 200
                }
            ]
        },
        purchaseHistory : [
            {item: "dia", purchasedWith: "usdt", amountPurchased: 50, unitPurchased: 1000},
            {item: "keys", purchasedWith: "dia", amountPurchased: 500, unitPurchased: 5},
            {item: "keys", purchasedWith: "dia", amountPurchased: 200, unitPurchased: 2},
            {item: "keys", purchasedWith: "dia", amountPurchased: 200, unitPurchased: 2}
        ]
    },
    inGame: {
        connected: true,
        ready: false,
        host: true,
        join: false,
        opponent: {},
        wins : 10,
        losses : 2,
        won : false,
        lose : false,
        myCode: "",
        guesses : [],
        moves : null,
        time : null,
        powerUps : {
            timeFreezer : {
                active: false,
                duration: 5
            },
            timeBooster : {
                active: false,
                duration: 5
            },
            moveBooster : {
                active: false,
                duration: 5
            },
            detectiveMode : {
                active: false,
                duration: 5
            },
            wizardMode : {
                active: false,
                duration: 5
            }
        }
    },
    gameHistory: {
        gamePlaySocials: {
            rank : {title: "rank", value: 0, badge: ""}, 
            team : {title: "team", value: "", badge: ""}
        },
        singlePlayerGamePlayHistories: {
            vsComputer: {title: "Vs Computer", gameplayed: 0, wins: 0, losses: 0},
            survivalMode: {title: "Survival Mode", gameplayed: 0, wins: 0, losses: 0},
            storyMode: {title: "Story Mode", gameplayed: 0, wins: 0, losses: 0}
        },
        multiplayerGamePlayHistories: {
            offlineMultiplayer: {
                title: "Offline Multiplayer", 
                total: {title: "total", gameplayed: 0, wins: 0, losses: 0},
                whenHost: {title: "whenHost", gameplayed: 0, wins: 0, losses: 0}, 
                whenJoin: {title: "whenJoin", gameplayed: 0, wins: 0, losses: 0}
            },
            onlineMultiplayer: {
                title: "Online Multiplayer",
                total: {title: "total", gameplayed: 0, wins: 0, losses: 0},
                whenHost: {title: "whenHost", gameplayed: 0, wins: 0, losses: 0}, 
                whenJoin: {title: "whenJoin", gameplayed: 0, wins: 0, losses: 0}
            }
        }
    },
    settings : {
        theme : "dark",
        sound : false,
        audio : false,
        language : "english"
    }
}

module.exports = playerDefaultValue