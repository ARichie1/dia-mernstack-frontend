import React, { createContext, useState } from 'react'
import socketGameService from '../hooks/connections/gameService'
import socketInService from '../hooks/connections/socketService'

export const GameContext = new createContext()

const GameContextProvider = (props) => {
    const GameUiLinks = {
        game : [
          {title: "HOW TO PLAY", to: "tutorial", id: 0},
          {title: "SINGLE PLAYER", to: "single-player", gtype: true, id: 1},
          {title: "MULTIPLAYER", to: "multiplayer", gtype: true, id: 2},
          {title: "SETTINGS", to: "settings", id: 3},
          {title: "MORE GAMES", to: "more-games", id: 4},
          {title: "QUIT", to: "/", id: 5}
        ],
        
        singleplayer : [
          {title: "FIND AGENT", to: "find-agents", gmode: true, id: 0},
          {title: "STORY", to: "story-mode", gmode: true, id: 1},
          {title: "SURVIVAL", to: "survival-mode", gmode: true, id: 2}
        ],
    
        multiplayer : [
          {title: "lOCAL", to: "local", id: 0},
          {title: "ONLINE", to: "online", id: 1}
        ],
    
        multiplayerLocal : [
          {title: "HOST", to: "host", id: 0},
          {title: "JOIN", to: "join", id: 1}
        ],
    
        multiplayerOnline : [
          {title: "QUICK PLAY", to: "quickplay", gmode: true, id: 0},
          {title: "CHALLENGE", to: "challenge", gmode: true, id: 1}
        ],
    
        multiplayerOnlineChallenge : [
          {title: "HOST", to: "host", id: 0},
          {title: "JOIN", to: "join", id: 1}
        ],
    
        settings : [
          {title: "AUDIO", to: "audio", id: 0},
          {title: "DISPLAY", to: "display", id: 1},
          {title: "PROFILE", to: "profile", id: 2}
        ]
    }
    
    const Difficulties = [
        {difficulty : "endless", agents : null, time: null, moves: null, color: "var(--themeColor)", id: 1} , 
        {difficulty : "easy", agents : 2, time: 60, moves: 8, color: "green", id: 2}, 
        {difficulty : "medium", agents : 3, time: 90, moves: 9, color: "greenyellow", id: 3}, 
        {difficulty : "hard", agents : 4, time: 180, moves: 10, color: "orange", id: 4}, 
        {difficulty : "detective", agents : 5, time: 210, moves: 11, color: "red", id: 5}, 
        {difficulty : "wizard", agents : 6, time: 300, moves: 12, color: "purple", id: 6}
    ]

    const defaultDifficulty = Difficulties[1]
    const [chosenDifficulty, setChosenDifficulty] = useState(defaultDifficulty)
    const [hasSelectedDifficulty,  setHasSelectedDifficulty] = useState(false)

    const insertDifficulty = (diff) => {
      setChosenDifficulty(diff)
      setHasSelectedDifficulty(true)
      console.log(diff);  
    }

    const [maxSelection, setMaxSelection] = useState(false)

    const [gameType, setGameType] = useState(null)
    const [gameMode, setGameMode] = useState(null)
    const [gameProperties, setGameProperties] = useState({
      type: gameType, mode: gameMode,
      difficulty: chosenDifficulty
    })
    
    
    const [isHost,  setIsHost] = useState(false)
    const [isJoin,  setIsJoin] = useState(false)
    const [isInRoom, setIsInRoom] = useState(false)
    const [isRoomFull,  setIsRoomFull] = useState(false)

    const [isOutGame,  setIsOutGame] = useState(true)
    const [isInGame,  setIsInGame] = useState(false)
    
    const [isReady,  setIsReady] = useState(false)
    const [isOpponentReady,  setIsOpponentReady] = useState(false)
    
    const [isConnected,  setIsConnected] = useState(false)
    const [isOpponentConnected,  setIsOpponentConnected] = useState(false)
    
    const [isReadyToPlay,  setIsReadyToPlay] = useState(false)
    const [isOpponentReadyToPlay,  setIsOpponentReadyToPlay] = useState(false)
    
    const [canBuildCode, setCanBuildCode] = useState(false)
    const [canPlayGame, setCanPlayGame] = useState(false)

    const [turnOrder,  setTurnOrder] = useState(null)
    const [isTurn,  setIsTurn] = useState(false)

    const switchGameLocation = (location) => {
      if (location === "ingame"){
        setIsInGame(true)
        setIsOutGame(false)
      }else if (location === "outgame"){
        setIsInGame(false)
        setIsOutGame(true)
      }
    }

    const [codeSelection, setCodeSelection] = useState([]) 

    const getSelectedCode = (selection) => {
      let selectedCodes = []
      selection.forEach(agent => {
        selectedCodes = [...selectedCodes, agent.btn_id]
      })
      return selectedCodes
    }

    const [showSendBtn, setShowSendBtn] = useState(false)
    const [showSaveBtn, setShowSaveBtn] = useState(false)
    const [showPlayBtn, setShowPlayBtn] = useState(false)

    const sendSelectedCode = async (selection) => {
      let selectedCodes = getSelectedCode(selection)
      console.log(selectedCodes);

      const socket = socketInService.socket
      await socketGameService.saveCode(socket, selectedCodes)
      .then((data)=> {
        console.log("code saved : ", data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    const sendReadyToPlay = async () => {
      const socket = socketInService.socket
      await socketGameService.sendReadyToPlay(socket)
      .then((data) => {
        console.log("sent r2p : ", data);
        
        setIsReadyToPlay(data)
        setCanPlayGame(data)
      })
      .catch((err) => {
        console.log(err);
      })
    }

    const handleSaveBtn = (selection) => {
      setShowSaveBtn(false)
      setShowPlayBtn(true)
      sendSelectedCode(selection)
    }
    
    const handlePlayBtn = (action) => {
      sendReadyToPlay()
      setShowPlayBtn(false)
      setShowSaveBtn(true)
      setMaxSelection(false)
    }

    const handleSendBtn = (selection, func) => {
      // sendSelectedCode(selection)

      if (func) {
        func()
      }
    }

    const handleInsertButtons = (selectionLength) => {
      if (chosenDifficulty.agents === (selectionLength)) {
        isOutGame ? setShowSaveBtn(true) : setShowSendBtn(true)
        setMaxSelection(true)
      }else{
        isOutGame ? setShowSaveBtn(false) : setShowSendBtn(false)
        setMaxSelection(false)
      }
    }

    return (
        <GameContext.Provider value={{
            GameUiLinks, Difficulties, defaultDifficulty,
            chosenDifficulty, setChosenDifficulty,
            hasSelectedDifficulty,  setHasSelectedDifficulty,
            insertDifficulty,
            maxSelection, setMaxSelection,
            gameType, setGameType,
            gameMode, setGameMode,
            gameProperties, setGameProperties,

            isHost,  setIsHost,
            isJoin,  setIsJoin,
            isInRoom, setIsInRoom,
            isRoomFull,  setIsRoomFull,
            isInGame, setIsInGame,
            isOutGame,  setIsOutGame,
            isReady,  setIsReady,
            isOpponentReady,  setIsOpponentReady,
            isReadyToPlay,  setIsReadyToPlay,
            isOpponentReadyToPlay,  setIsOpponentReadyToPlay,
            isConnected,  setIsConnected,
            isOpponentConnected,  setIsOpponentConnected,

            canBuildCode, setCanBuildCode,
            canPlayGame, setCanPlayGame,

            turnOrder,  setTurnOrder,
            isTurn,  setIsTurn,
        
            switchGameLocation,
            showSaveBtn, setShowSaveBtn, 
            showPlayBtn, setShowPlayBtn,
            showSendBtn, setShowSendBtn,
            handleSaveBtn, handlePlayBtn, handleSendBtn,
            handleInsertButtons,
            codeSelection, setCodeSelection,
            getSelectedCode
        }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContextProvider