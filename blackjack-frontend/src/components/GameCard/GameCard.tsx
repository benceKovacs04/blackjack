import React from 'react'
import classes from './GameCard.module.css'

export default function GameCard(props: any) {
    return (
        <div className={classes.Card}>
            <p>{props.name}</p>
            <p>{props.seats}</p>
        </div>
    )
}
