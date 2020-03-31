import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./containers/Login/Login"
import SignUp from './containers/SignUp/SignUp'

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
        </BrowserRouter>
    );
}

export default App;
