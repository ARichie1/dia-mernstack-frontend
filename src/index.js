import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './ingame.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './contexts/AuthContext';
import AppGlobalVariableContextProvider from './contexts/AppGlobalVariableContext';
import ThemeContextProvider from './contexts/ThemeContext';
import GameContextProvider from './contexts/GameContext';
import InGameContextProvider from './contexts/InGameContext';
import CodeCreationContextProvider from './contexts/CodeCreationContext';
import UserContextProvider from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppGlobalVariableContextProvider>
        <UserContextProvider>
          <ThemeContextProvider>
            <GameContextProvider>
              <InGameContextProvider>
                <CodeCreationContextProvider>
                  <App />
                </CodeCreationContextProvider>
              </InGameContextProvider>
            </GameContextProvider>
          </ThemeContextProvider>
        </UserContextProvider>
      </AppGlobalVariableContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
