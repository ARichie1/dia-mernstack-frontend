import React, { createContext, useState } from 'react'

export const GameContext = new createContext()

const GameContextProvider = (props) => {
    const GameUiLinks = {
        game : [
          {title: "HOW TO PLAY", to: "tutorial", id: 0},
          {title: "SINGLE PLAYER", to: "single-player", id: 1},
          {title: "MULTIPLAYER", to: "multiplayer", id: 2},
          {title: "SETTINGS", to: "settings", id: 3},
          {title: "MORE GAMES", to: "more-games", id: 4},
          {title: "QUIT", to: "/", id: 5}
        ],
        
        singleplayer : [
          {title: "FIND AGENT", to: "find-agents", id: 0},
          {title: "STORY", to: "story-mode", id: 1},
          {title: "SURVIVAL", to: "survival-mode", id: 2}
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
          {title: "QUICK PLAY", to: "quickplay", id: 0},
          {title: "CHALLENGE", to: "challenge", id: 1}
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

    const [gameMode, setGameMode] = useState(null)

    const [isHost,  setIsHost] = useState(false)
    const [isJoin,  setIsJoin] = useState(false)
    const [isInRoom, setIsInRoom] = useState(false)
    const [isRoomFull,  setIsRoomFull] = useState(false)

    const [isOutGame,  setIsOutGame] = useState(true)
    const [isInGame,  setIsInGame] = useState(false)

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

    const sendSelectedCode = (selection) => {
      let selectedCodes = getSelectedCode(selection)
      console.log(selectedCodes);
    }

    const [showSendBtn, setShowSendBtn] = useState(false)
    const [showSaveBtn, setShowSaveBtn] = useState(false)
    const [showPlayBtn, setShowPlayBtn] = useState(false)

    const handleSaveBtn = (selection) => {
      setShowSaveBtn(false)
      setShowPlayBtn(true)
      sendSelectedCode(selection)
    }
    
    const handlePlayBtn = (action) => {
      switchGameLocation("ingame")
      setShowPlayBtn(false)
      setShowSaveBtn(true)
      setMaxSelection(false)
    }

    const handleSendBtn = (selection, func) => {
      sendSelectedCode(selection)

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
            GameUiLinks, Difficulties,
            chosenDifficulty, setChosenDifficulty,
            hasSelectedDifficulty,  setHasSelectedDifficulty,
            insertDifficulty,
            maxSelection, setMaxSelection,
            gameMode, setGameMode,
            isHost,  setIsHost,
            isJoin,  setIsJoin,
            isInRoom, setIsInRoom,
            isRoomFull,  setIsRoomFull,
            isInGame, setIsInGame,
            isOutGame,  setIsOutGame,
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