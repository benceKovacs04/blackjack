import React, { useState } from 'react'
import classes from "./Signup.module.css";
import axios from 'axios'

export default function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordTwo, setPasswordTwo] = useState<string>("");

    const usernameOnChange = (e: any) => {
        setUsername(e.target.value);
    }

    const passwordOnChange = (e: any) => {
        setPassword(e.target.value);
    }

    const passwordTwoOnChange = (e: any) => {
        setPasswordTwo(e.target.value)
    }

    const signUp = () => {
        if (password === passwordTwo) {
            axios.post(
                "http://localhost:5000/signup",
                {
                    username: username,
                    password: password
                }
            ).then(resp => console.log(resp))
        }

    }

    return (
        <div className={classes.Background}>
            <div className={classes.Login}>
                <h1>BBBBBBBlackJack - Log in</h1>
                <input onChange={usernameOnChange} placeholder="Username"></input>
                <input type="password" onChange={passwordOnChange} placeholder="Password"></input>
                <input type="password" onChange={passwordOnChange} placeholder="Password again"></input>
                <button onClick={signUp}>Sign up!</button>
                <button onClick={() => window.location.href = "/"}>Back</button>
            </div>
        </div>
    )
}
