import React from 'react'
import classes from './GameCard.module.css'

export default function GameCard(props: any) {
    return (
        <div onClick={() => props.click(props.name)} className={classes.Card}>
            <p>{props.name}</p>
            <p>{props.seats} / 3</p>
        </div>
    )
}
