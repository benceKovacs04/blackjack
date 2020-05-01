import React, { useState, useContext } from 'react'
import classes from "./Login.module.css";
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import LoggedInCpontext from '../../contexts/LoggedInContext'

export default function Login() {

    const { loggedIn, toggleLoggedIn, setUser } = useContext(LoggedInCpontext)

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [toGame, setToGame] = useState<boolean>(loggedIn ? true : false);
    const [toSignUp, setToSignUp] = useState<boolean>(false);


    const usernameOnChange = (e: any) => {
        setUsername(e.target.value);
    }

    const passwordOnChange = (e: any) => {
        setPassword(e.target.value);
    }

    const logIn = () => {
        setError("")
        axios.post(
            "http://localhost:5000/auth/login",
            {
                username: username,
                password: password
            },
            { withCredentials: true }
        )
            .then(() => {
                toggleLoggedIn()
                setUser(username)
                setToGame(true)
            })
            .catch(error => setError("Something went wrong! Please try again!"))
    }

    return (
        <div className={classes.Background}>
            {toGame ? <Redirect to="/gameManager" /> : null}
            {toSignUp ? <Redirect to="/signUp" /> : null}
            <div className={classes.Login}>
                <h1>BBBBBBBlackJack - Log in</h1>
                <input onChange={usernameOnChange} placeholder="Username"></input>
                <input type="password" onChange={passwordOnChange} placeholder="Password"></input>
                <button onClick={logIn}>Log me in!</button>
                <span>Don't have an account? <span className={classes.SignUp} onClick={() => setToSignUp(true)} >Sign UP!</span></span>
                <span>{error}</span>
            </div>
        </div>
    )
}
