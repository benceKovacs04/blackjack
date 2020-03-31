import React, { useState } from 'react'
import classes from "./Login.module.css";
import axios from 'axios'

export default function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const usernameOnChange = (e: any) => {
        setUsername(e.target.value);
    }

    const passwordOnChange = (e: any) => {
        setPassword(e.target.value);
    }

    const logIn = () => {

        axios.post(
            "http://localhost:5000/auth/login",
            {
                username: username,
                password: password
            },
            { withCredentials: true }
        ).then(resp => console.log(resp))
    }

    return (
        <div className={classes.Background}>
            <div className={classes.Login}>
                <h1>BBBBBBBlackJack - Log in</h1>
                <input onChange={usernameOnChange} placeholder="Username"></input>
                <input type="password" onChange={passwordOnChange} placeholder="Password"></input>
                <button onClick={logIn}>Log me in!</button>
                <span>Don't have an account? <a href="/signup">Sign up!</a></span>
            </div>
        </div>
    )
}
