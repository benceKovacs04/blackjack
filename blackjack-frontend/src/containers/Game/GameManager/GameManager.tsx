import React, { useState, useEffect } from 'react'
import classes from './GameManager.module.css'
import axios from 'axios'

export default function GameManager() {

    const [test, setTest] = useState<string>("")

    useEffect(() => {
        axios.get(
            "http://localhost:5000/auth/test",
            { withCredentials: true }
        ).then(resp => {
            console.log(resp)
            setTest(resp.data)
        })
    }, [])

    return (
        <div className={classes.Background}>
            <div className={classes.LobbyList}>
                <p>{test}</p>
            </div>
        </div>
    )
}
