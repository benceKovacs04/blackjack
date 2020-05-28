import React from 'react'
import classes from './BetButtons.module.css'

export default function BetButtons(props: any) {
    return (
        <div className={classes.BetButtons}>
            <button onClick={props.placeBet}>Bet</button>
            <button onClick={() => props.increaseBet(1)}>1$</button>
            <button onClick={() => props.increaseBet(10)}>10$</button>
            <button onClick={() => props.increaseBet(50)}>50$</button>
            <button onClick={() => props.increaseBet(100)}>100$</button>
            <button onClick={() => props.increaseBet(200)}>200$</button>
            <button onClick={() => props.increaseBet(500)}>500$</button>
            <button onClick={() => props.increaseBet(-1)}>Reset</button>
        </div>
    )
}
