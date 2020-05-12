import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./containers/Login/Login"
import SignUp from './containers/SignUp/SignUp'
import GameManager from './containers/Game/GameManager/GameManager'
import Game from './containers/Game/Game'
import { LoggedInContextWrapper } from './contexts/LoggedInContext'
import { WebSocketContextWrapper } from './contexts/WebSocketContext'

function App() {
    return (
        <LoggedInContextWrapper>
            <BrowserRouter>
                <Route
                    path="/"
                    exact
                    render={() => <Login />}
                />
                <Route
                    path="/signUp"
                    render={() => <SignUp />}
                />
                <Route
                    path="/gameManager"
                    render={() => <GameManager />}
                />
                <WebSocketContextWrapper>
                    <Route
                        path="/game/:name"
                        render={(props) => <Game {...props} />}
                    />
                </WebSocketContextWrapper>
            </BrowserRouter>
        </LoggedInContextWrapper>
    );
}

export default App;
