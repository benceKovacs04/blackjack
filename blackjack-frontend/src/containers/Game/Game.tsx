import React, { useState } from 'react'
import classes from './Game.module.css'

export default function Game(props: any) {

    const [tableName, setTableName] = useState<string>(props.match.params.name)



    return (
        <div className={classes.Background}>
            <p>hello fsz</p>
        </div>
    )
}
