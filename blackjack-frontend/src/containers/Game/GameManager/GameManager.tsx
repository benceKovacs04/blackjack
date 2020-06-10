import React, { useState, useEffect, useContext } from 'react'
import classes from './GameManager.module.css'
import axios from 'axios'
import GameCard from '../../../components/GameCard/GameCard'
import { Redirect } from 'react-router-dom'
import loggedInContext from '../../../contexts/LoggedInContext'
import { constants } from "../../../constants/constants"

export default function GameManager() {

    const [games, setGames] = useState<Array<{ name: string, seats: number, owner: string }>>([])
    const [name, setName] = useState<string>("")
    const [redirectToGame, setRedirectToGame] = useState<boolean>(false)
    const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false)
    const [roomName, setRoomName] = useState<string>("")

    const { username, logOut } = useContext(loggedInContext)

    useEffect(() => {
        refreshLobbies()
    }, [])

    const refreshLobbies = () => {
        axios.get(
            `${constants.backendAddress}/gameManager/getGamesData`,
            { withCredentials: true }
        ).then(resp => {
            setGames(resp.data)
        })
    }

    const addLobby = () => {
        if (name !== "") {
            axios.post(
                `${constants.backendAddress}/gameManager/newGame`,
                { name: name, owner: username },
                { withCredentials: true }
            ).then(resp => {
                if (resp.data !== "") {
                    setGames(games => games.concat(resp.data))
                }
            })
        }
    }

    const onCardDelete = (name: string) => {
        const newArr = [...games].filter(g => g.name !== name);
        setGames(newArr)
    }

    const onCardClick = (roomname: string) => {
        axios.get(
            `${constants.backendAddress}/gameManager/can-join-room?roomName=${roomname}`,
            { withCredentials: true }
        ).then(resp => {
            if (resp.data === true) {
                setRoomName(roomname);
                setRedirectToGame(true)
            } else {
                refreshLobbies()
            }
        })
    }

    const logOutClick = () => {
        axios.get(
            `${constants.backendAddress}/auth/log-out`,
            { withCredentials: true })
            .then(resp => {
                if (resp.status === 200) {
                    logOut();
                    setRedirectToLogin(true)
                }
            })

    }


    return (
        <div className={classes.Background}>
            {redirectToGame ? <Redirect to={`/game/${roomName}`} /> : null}
            {redirectToLogin ? <Redirect to={"/"} /> : null}
            <button onClick={logOutClick} className={classes.Logout}>logout</button>
            <div className={classes.Header}>
                <h1>Tables</h1>
                <div className={classes.Inputs}>
                    <button onClick={addLobby}>Add new game</button>
                    <input onChange={e => setName(e.target.value)} maxLength={30}></input>
                    <button onClick={refreshLobbies}>Refresh list</button>
                </div>
            </div>
            <div className={classes.LobbyList}>
                {games.map(game => {
                    return <GameCard click={onCardClick} name={game.name} seats={game.seats} owner={game.owner} onDelete={onCardDelete} />
                })}
            </div>
        </div>
    )
}
