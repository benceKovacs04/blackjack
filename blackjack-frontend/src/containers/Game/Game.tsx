import React, { useState, useContext, useEffect, useRef } from 'react'
import classes from './Game.module.css'
import loggedInContext from '../../contexts/LoggedInContext'
import webSocketContext from '../../contexts/WebSocketContext'

export default function Game(props: any) {

    const { username, loggedIn } = useContext(loggedInContext)
    const { connect, myTurn, playerAction } = useContext(webSocketContext)

    const [tableName, setTableName] = useState<string>(props.match.params.name)

    useEffect(() => {
        if (loggedIn) {
            connect(tableName);
        }
    })

    const getCard = () => {
        playerAction(1)
    }

    const fold = () => {
        playerAction(0)
    }

    return (
        <div className={classes.Background}>
            <h1>{username}</h1>>
            <h1>{tableName}</h1>>
            {
                myTurn ?
                    <div>
                        <button onClick={getCard} >card</button>
                        <button onClick={fold} >fold</button>
                    </div> : null
            }
        </div>
    )
}
