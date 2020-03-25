import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./containers/Login/Login"

function App() {
    return (
        <BrowserRouter>
            <Route
                path="/"
                exact
                render={() => <Login />}
            />
        </BrowserRouter>
    );
}

export default App;
