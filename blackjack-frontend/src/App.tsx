import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./containers/Login/Login"
import SignUp from './containers/SignUp/SignUp'
import GameManager from './containers/Game/GameManager/GameManager'

function App() {
    return (
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
        </BrowserRouter>
    );
}

export default App;
