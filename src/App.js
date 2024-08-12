import React, {Component} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import GLOBAL from "./global/Global.js";
import NavPage from "./components/reuseable/NavPage";

import Home from "./components/Home";
import TutorialPage from "./components/TutorialPage"
import MoreGamesPage from "./components/MoreGamesPage"
import NoMatch from "./components/NoMatch"

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

import SettingsPage from "./components/settings_pages/SettingsPage"
import AudioSettings from "./components/settings_pages/AudioSettings"
import DisplaySettings from "./components/settings_pages/DisplaySettings"
import LanguageSettings from "./components/settings_pages/LanguageSettings"
import ProfileSettings from "./components/settings_pages/ProfileSettings"

class App extends Component{ 
  render() {
    const { Links } = GLOBAL()
    
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<GameHome />} >
              <Route index element={<NavPage links={Links.game}/>} />
              <Route path="tutorial" element={<TutorialPage />} />
              <Route path="more-games" element={<MoreGamesPage />} />
              
              <Route path="single-player" element={<SinglePlayerPage />}>
                <Route index element={<NavPage links={Links.singleplayer}/>} />
                <Route path="find-agents" element={<FindAgentsPage />} />
                <Route path="story-mode" element={<StoryModePage />} />
                <Route path="survival-mode" element={<SurvivalModePage />} />
              </Route>

              <Route path="multiplayer" element={<MultiplayerPage />}>
                <Route index element={<NavPage links={Links.multiplayer}/>} />

                <Route path="local" element={<LocalPlayPage />} >
                  <Route index element={<NavPage links={Links.multiplayerLocal}/>} />
                  <Route path="host" element={<LocalPlayHostPage />} />
                  <Route path="join" element={<LocalPlayJoinPage />} />
                </Route>

                <Route path="online" element={<OnlinePlayPage />} >
                  <Route index element={<NavPage links={Links.multiplayerOnline}/>} />
                  <Route path="quick-play" element={<GamePage />} />
                  <Route path="challenge" element={<OnlineChallenge/>} >
                    <Route index element={<NavPage links={Links.multiplayerOnlineChallenge}/>} />
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
                <Route index element={<NavPage links={Links.settings}/>} />
                <Route path="audio" element={<AudioSettings />} />
                <Route path="display" element={<DisplaySettings />} />
                <Route path="language" element={<LanguageSettings />} />
                <Route path="profile" element={<ProfileSettings />} />
              </Route>
            </Route>

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
}

export default App;
