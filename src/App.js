import React, { useContext, useEffect, useState} from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext.js";
import { GameContext } from "./contexts/GameContext.js";
import socketInService from "./hooks/connections/socketService/index.js";

import NavPage from "./components/reuseable/pages/NavPage.js";

import TutorialPage from "./components/game_pages/TutorialPage.js"
import Home from "./components/pages/Home.js";
import AboutPage from "./components/pages/AboutPage.js";
import ContactPage from "./components/pages/ContactPage.js";
import MoreGamesPage from "./components/game_pages/MoreGamesPage.js"
import NoMatch from "./components/pages/NoMatch.js"

import LoginPage from "./components/pages/LoginPage.js";
import SignUpPage from "./components/pages/SignUpPage.js";
import LandingPage from "./components/pages/LandingPage.js";

import SinglePlayerPage from "./components/single_player_pages/SinglePlayerPage"
import FindAgentsPage from "./components/single_player_pages/FindAgentsPage"
import StoryModePage from "./components/single_player_pages/StoryModePage"
import SurvivalModePage from "./components/single_player_pages/SurvivalModePage"

import MultiplayerPage from "./components/multiplayer_pages/MultiplayerPage"
import LocalPlayPage from "./components/multiplayer_pages/LocalPlayPage"
import LocalPlayHostPage from "./components/multiplayer_pages/LocalPlayHostPage"
import LocalPlayJoinPage from "./components/multiplayer_pages/LocalPlayJoinPage"

import OnlinePlayPage from "./components/multiplayer_pages/OnlinePlayPage"
import OnlineChallenge from "./components/multiplayer_pages/OnlineChallenge"
import OnlinePlayHostPage from "./components/multiplayer_pages/OnlinePlayHostPage"
import OnlinePlayJoinPage from "./components/multiplayer_pages/OnlinePlayJoinPage"

import GameHome from "./components/game_pages/GameHome";
import GamePage from "./components/game_pages/GamePage"
import SinglePlayerGamePage from "./components/game_pages/SinglePlayerGamePage"
import MultiplayerGamePage from "./components/game_pages/MultiplayerGamePage"

import SelectCodePage from "./components/ingame/SelectCodePage.js";
import FaceOffPage from "./components/reuseable/pages/FaceOffPage.js";

import SettingsPage from "./components/settings_pages/SettingsPage"
import AudioSettings from "./components/settings_pages/AudioSettings"
import DisplaySettings from "./components/settings_pages/DisplaySettings"
import LanguageSettings from "./components/settings_pages/LanguageSettings"
import ProfileSettings from "./components/settings_pages/ProfileSettings"
import socketGameService from "./hooks/connections/gameService/index.js";

const App = () => {
  const { user , userInfo: currentPlayer} = useAuthContext()
  const { GameUiLinks, setIsHost, setIsJoin,
          isInRoom, setIsInRoom, isRoomFull } = useContext(GameContext)
  
  const connectToSocket = async () => {
    await socketInService.connect("")
    .catch((err) => {
      console.log("Error: ", err);
    })
  }

  const checkInRoom = async () => {
    const socket = socketInService.socket
    if (!socket) return;

    let check = await socketGameService.isPlayerInRoom(socket)
    .then((data) => {
      if (data) {
        setIsInRoom(data.inRoom)
        setIsHost(data.host)
        setIsJoin(data.join)
      }
    }).catch((err) => {

    })
  }

  useEffect(() => {
    if (user) {
      connectToSocket()
      if (currentPlayer) {
        socketGameService.getAndCreatePlayer(currentPlayer)
      }
    }
    
  }, [currentPlayer])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route  path="/" element={<Home />} >
            <Route index element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={user ? <Navigate to="/"/> : <LoginPage />} />
            <Route path="/signup" element={user ? <Navigate to="/"/> : <SignUpPage />} />
          </Route>

          {user && 
            <Route path="/game" element={<GameHome/>} >
            <Route index element={<NavPage GameUiLinks={GameUiLinks.game}/>} />
            <Route path="tutorial" element={<TutorialPage />} />
            <Route path="more-games" element={<MoreGamesPage />} />
            
            <Route path="single-player" element={<SinglePlayerPage />}>
              <Route index element={<NavPage GameUiLinks={GameUiLinks.singleplayer}/>} />
              <Route path="find-agents" element={<FindAgentsPage />} />
              <Route path="story-mode" element={<StoryModePage />} />
              <Route path="survival-mode" element={<SurvivalModePage />} />
            </Route>

            <Route path="multiplayer" element={<MultiplayerPage />}>
              <Route index element={<NavPage GameUiLinks={GameUiLinks.multiplayer}/>} />

              <Route path="select-code" element={isRoomFull ? <SelectCodePage /> : <Navigate to="/game"/>} />
              <Route path="face-off" element={isInRoom ? <FaceOffPage /> : <Navigate to="/game"/>} />
             
              <Route path="local" element={<LocalPlayPage />} >
                <Route index element={<NavPage GameUiLinks={GameUiLinks.multiplayerLocal}/>} />
                <Route path="host" element={<LocalPlayHostPage />} />
                <Route path="join" element={<LocalPlayJoinPage />} />
              </Route>

              <Route path="online" element={<OnlinePlayPage />} >
                <Route index element={<NavPage GameUiLinks={GameUiLinks.multiplayerOnline}/>} />
                <Route path="quick-play" element={<GamePage />} />
                <Route path="challenge" element={<OnlineChallenge/>} >
                  <Route index element={<NavPage GameUiLinks={GameUiLinks.multiplayerOnlineChallenge}/>} />
                  <Route path="host" element={<OnlinePlayHostPage />} />
                  <Route path="join" element={<OnlinePlayJoinPage />} />
                </Route>
              </Route>
            </Route>

            <Route path="in-game" element={<GamePage />}>
              <Route path="single-player/:userid" element={<SinglePlayerGamePage />} />
              <Route path="multiplayer/:userid" element={<MultiplayerGamePage />} />
            </Route>
 
            <Route path="settings" element={<SettingsPage />}>
              <Route index element={<NavPage GameUiLinks={GameUiLinks.settings}/>} />
              <Route path="audio" element={<AudioSettings />} />
              <Route path="display" element={<DisplaySettings />} />
              <Route path="language" element={<LanguageSettings />} />
              <Route path="profile" element={<ProfileSettings />} />
            </Route>
          </Route>}

          {/* <Route path="/users" element={<Users/>}>
            <Route path=":userid" element={<UserDetails />} />
            <Route path="admin" element={<Admin />} />
          </Route> */}
        
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>   
    </BrowserRouter>
  );
}

export default App;
