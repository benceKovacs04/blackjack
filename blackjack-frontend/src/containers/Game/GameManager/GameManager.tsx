import React, { useState, useEffect } from 'react'
import classes from './GameManager.module.css'
import axios from 'axios'

import GameCard from '../../../components/GameCard/GameCard'

export default function GameManager() {

    const [games, setGames] = useState<Array<{ name: string, seats: number }>>([])
    const [name, setName] = useState<string>("")

    useEffect(() => {
        axios.get(
            "http://localhost:5000/gameManager/getGamesData",
            { withCredentials: true }
        ).then(resp => {
            setGames(games => games.concat(resp.data))
        })
    }, [])

    const addLobby = () => {
        if (name !== "") {
            axios.post(
                "http://localhost:5000/gameManager/newGame",
                { name: name },
                { withCredentials: true }
            ).then(resp => {
                if (resp.data !== "") {
                    setGames(games => games.concat(resp.data))
                }
            })
        }
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
                {games.map(game => {
                    return <GameCard name={game.name} seats={game.seats} />
                })}
            </div>
        </div>
    )
}
