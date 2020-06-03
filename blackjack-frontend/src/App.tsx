import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./containers/Auth/Login/Login"
import SignUp from './containers/Auth/SignUp/SignUp'
import GameManager from './containers/Game/GameManager/GameManager'
import Game from './containers/Game/Game'
import { LoggedInContextWrapper } from './contexts/LoggedInContext'

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

                <Route
                    path="/game/:name"
                    render={(props) => <Game {...props} />}
                />

            </BrowserRouter>
        </LoggedInContextWrapper>
    );
}

export default App;
