import React from 'react'
import classes from './player.module.css'
import BetButtons from './BetButtons/BetButtons'

export default function Player(props: any) {
    return (
        <div className={classes.Player}>
            <h1>{props.player.playerName} {props.currency ? `- ${props.currency}$` : null}</h1>
            {
                props.betPhase ?
                    <BetButtons /> :
                    null
            }
        </div>
    )
}
