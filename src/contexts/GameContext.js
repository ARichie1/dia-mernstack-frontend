import React, { createContext } from 'react'

export const GameContext = new createContext()

const GameContextProvider = (props) => {
    const Links = {
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

    return (
        <GameContext.Provider value={{
            Links, Difficulties
        }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContextProvider