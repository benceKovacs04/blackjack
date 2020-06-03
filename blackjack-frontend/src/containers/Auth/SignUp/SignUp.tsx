import React, { useState } from 'react'
import classes from "../Auth.module.css";
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { constants } from '../../../constants/constants'

export default function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordTwo, setPasswordTwo] = useState<string>("");

    const [toLogin, setToLogin] = useState<boolean>(false);

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
                `${constants.backendAddress}/auth/signUp`,
                {
                    username: username,
                    password: password
                }
            ).then(resp => {
                if (resp.status === 201) {
                    setToLogin(true);
                }
            })
        }

    }

    return (
        <div className={classes.Background}>
            {toLogin ? <Redirect to="/" /> : null}
            <div className={classes.Auth}>
                <h1>Black<span className={classes.Jack}>Jack</span></h1>
                <input onChange={usernameOnChange} placeholder="Username"></input>
                <input type="password" onChange={passwordOnChange} placeholder="Password"></input>
                <input type="password" onChange={passwordTwoOnChange} placeholder="Password again"></input>
                <button onClick={signUp}>Sign up!</button>
                <button onClick={() => setToLogin(true)}>Back</button>
            </div>
        </div>
    )
}
