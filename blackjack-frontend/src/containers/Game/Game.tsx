import React, { useState, useContext, useEffect, useRef } from 'react'
import classes from './Game.module.css'
import loggedInContext from '../../contexts/LoggedInContext'

import socketIO from "socket.io-client"
export default function Game(props: any) {

    const { username } = useContext(loggedInContext)
    const [tableName, setTableName] = useState<string>(props.match.params.name)

    const [test, setTest] = useState("")


    const connection = socketIO("http://localhost:5000/game")

    connection.on("asd", (data: any) => {
        setTest(data)
    })


    return (
        <div className={classes.Background}>
            <h1>{username}</h1>>
            <h1>{tableName}</h1>>
            <h1>{test}</h1>
        </div>
    )
}
