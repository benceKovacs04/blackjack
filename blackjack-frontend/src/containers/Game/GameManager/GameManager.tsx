import React, { useState, useEffect } from 'react'
import classes from './GameManager.module.css'
import axios from 'axios'

export default function GameManager() {

    const [lobbies, setLobbies] = useState<string[]>([])
    const [name, setName] = useState<string>("")

    useEffect(() => {
        axios.get(
            "http://localhost:5000/gameManager/getGameNames",
            { withCredentials: true }
        ).then(resp => {
            setLobbies(lobbies => lobbies.concat(resp.data))
        })
    }, [])

    const addLobby = () => {
        console.log(name)
        axios.post(
            "http://localhost:5000/gameManager/newGame",
            { name: name },
            { withCredentials: true }
        ).then(resp => {
            setLobbies(lobbies => lobbies.concat(resp.data))
        })
    }

    return (
        <div className={classes.Background}>
            <button onClick={addLobby}>Add</button>
            <input onChange={e => setName(e.target.value)}></input>
            <div className={classes.LobbyList}>
                {lobbies.map(lobby => {
                    return <p>{lobby}</p>
                })}
            </div>
        </div>
    )
}
