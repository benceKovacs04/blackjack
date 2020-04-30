import React, { useState, useEffect } from 'react'
import classes from './GameManager.module.css'
import axios from 'axios'

import GameCard from '../../../components/GameCard/GameCard'

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
            <div className={classes.Header}>
                <h1>Tables</h1>
                <div className={classes.Inputs}>
                    <button onClick={addLobby}>Add new game</button>
                    <input onChange={e => setName(e.target.value)}></input>
                </div>
            </div>
            <div className={classes.LobbyList}>
                {lobbies.map(lobby => {
                    return <GameCard name={lobby} seats={"2 / 4"} />
                })}
            </div>
        </div>
    )
}
