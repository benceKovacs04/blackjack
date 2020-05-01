import React, { useState, useContext } from 'react'
import classes from './Game.module.css'
import loggedInContext from '../../contexts/LoggedInContext'

export default function Game(props: any) {

    const { username } = useContext(loggedInContext)
    const [tableName, setTableName] = useState<string>(props.match.params.name)



    return (
        <div className={classes.Background}>
            <h1>{username}</h1>>
            <h1>{tableName}</h1>>
        </div>
    )
}
