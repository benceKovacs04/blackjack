import React, { useState, useContext, useEffect, useRef } from 'react'
import classes from './Game.module.css'
import loggedInContext from '../../contexts/LoggedInContext'
import webSocketContext from '../../contexts/WebSocketContext'

export default function Game(props: any) {

    const { username, loggedIn } = useContext(loggedInContext)
    const { connect } = useContext(webSocketContext)

    const [tableName, setTableName] = useState<string>(props.match.params.name)

    const [test, setTest] = useState("")

    useEffect(() => {
        if (loggedIn) {
            connect(tableName);
        }
    })

    return (
        <div className={classes.Background}>
            <h1>{username}</h1>>
            <h1>{tableName}</h1>>
            <h1>{test}</h1>
        </div>
    )
}
