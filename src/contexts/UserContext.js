import React, { createContext, useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export const UserContext = new createContext()
const UserContextProvider = ({children}) => {
    const {userInfo} = useAuthContext()

    const [currentPlayer, setCurrentPlayer] = useState(userInfo)
    const [currentOpponent, setCurrentOpponent] = useState(null)
    const [bios, setBios] = useState()
    const [assets, setAssets] = useState(null)
    const [socials, setSocials] = useState(null)
    const [profileImage, setProfileImage] = useState(null) 
    const [gamePlaySocials, setGamePlaySocials] = useState(null)
    const [singlePlayerGamePlayHistories, setSinglePlayerGamePlayHistories] = useState(null)
    const [multiplayerGamePlayHistories, setMultiplayerGamePlayHistories] = useState(null)
    
    const updateUserStates = (userInfo) => {
        setBios([
            {title: "email", value: userInfo.email, id:1},
            {title: "username", value: userInfo.username, id:2},
            {title: "country", value: userInfo.country, id:3}
        ])
        setProfileImage({
            value: userInfo.profileImage.value, 
            pos: userInfo.profileImage.pos,
            posId: userInfo.profileImage.posId
        })
        
        setAssets([
            userInfo.finance.keys,
            userInfo.finance.dia,
            userInfo.finance.usdt
        ])
        
        setSocials([
            userInfo.socials.twitter,
            userInfo.socials.discord,
            userInfo.socials.telegram,
            userInfo.socials.twitch,
            userInfo.socials.steam,
            userInfo.socials.epicGames
        ])
        setGamePlaySocials([
            userInfo.gameHistory.gamePlaySocials.rank,
            userInfo.gameHistory.gamePlaySocials.team
        ])
        setSinglePlayerGamePlayHistories([
            userInfo.gameHistory.singlePlayerGamePlayHistories.vsComputer,
            userInfo.gameHistory.singlePlayerGamePlayHistories.survivalMode,
            userInfo.gameHistory.singlePlayerGamePlayHistories.storyMode
        ])
        setMultiplayerGamePlayHistories([
            userInfo.gameHistory.multiplayerGamePlayHistories.offlineMultiplayer,
            userInfo.gameHistory.multiplayerGamePlayHistories.onlineMultiplayer
        ])
    }

    // If userInfo has been fetched or changes 
    useEffect(() => {
        // If userInfo is not null
        if (userInfo) {updateUserStates(userInfo)}
    }, [userInfo])

    return (
        <UserContext.Provider value={{
            currentPlayer, setCurrentPlayer,
            currentOpponent, setCurrentOpponent,
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