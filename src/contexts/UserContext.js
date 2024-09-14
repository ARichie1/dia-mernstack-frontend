import React, { createContext, useEffect, useState } from 'react'
import useFetch from '../custom_hooks/useFetch'

export const UserContext = new createContext()

const UserContextProvider = ({children}) => {
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [currentPlayerOpponent, setCurrentPlayerOpponent] = useState(null)
    const [bios, setBios] = useState(null)
    const [assets, setAssets] = useState(null)
    const [socials, setSocials] = useState(null)
    const [profileImage, setProfileImage] = useState(null) 
    const [gamePlaySocials, setGamePlaySocials] = useState(null)
    const [singlePlayerGamePlayHistories, setSinglePlayerGamePlayHistories] = useState(null)
    const [multiplayerGamePlayHistories, setMultiplayerGamePlayHistories] = useState(null)
    
    const updateUserStates = (userUpdate) => {
        setBios([
            {title: "email", value: userUpdate.email, id:1},
            {title: "username", value: userUpdate.username, id:2},
            {title: "country", value: userUpdate.country, id:3}
        ])
        setProfileImage({
            value: userUpdate.profileImage.value, 
            pos: userUpdate.profileImage.pos,
            posId: userUpdate.profileImage.posId
        })
        console.log(profileImage);
        
        setAssets([
            userUpdate.finance.keys,
            userUpdate.finance.dia,
            userUpdate.finance.usdt
        ])
        console.log(assets);
        
        setSocials([
            userUpdate.socials.twitter,
            userUpdate.socials.discord,
            userUpdate.socials.telegram,
            userUpdate.socials.twitch,
            userUpdate.socials.steam,
            userUpdate.socials.epicGames
        ])
        setGamePlaySocials([
            userUpdate.gameHistory.gamePlaySocials.rank,
            userUpdate.gameHistory.gamePlaySocials.team
        ])
        setSinglePlayerGamePlayHistories([
            userUpdate.gameHistory.singlePlayerGamePlayHistories.vsComputer,
            userUpdate.gameHistory.singlePlayerGamePlayHistories.survivalMode,
            userUpdate.gameHistory.singlePlayerGamePlayHistories.storyMode
        ])
        setMultiplayerGamePlayHistories([
            userUpdate.gameHistory.multiplayerGamePlayHistories.offlineMultiplayer,
            userUpdate.gameHistory.multiplayerGamePlayHistories.onlineMultiplayer
        ])
    }

    return (
        <UserContext.Provider value={{
            currentPlayer, setCurrentPlayer,
            currentPlayerOpponent, setCurrentPlayerOpponent,
            bios, setBios,
            socials, setSocials,
            assets, setAssets,
            profileImage, setProfileImage,
            gamePlaySocials, setGamePlaySocials,
            singlePlayerGamePlayHistories, setSinglePlayerGamePlayHistories,
            multiplayerGamePlayHistories, setMultiplayerGamePlayHistories,
            updateUserStates
        }}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider