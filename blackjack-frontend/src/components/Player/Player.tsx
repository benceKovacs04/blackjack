import React from 'react'
import classes from './player.module.css'
import BetButtons from './BetButtons/BetButtons'

export default function Player(props: any) {
    return (
        <div className={classes.Player}>
            <h1>{props.player.playerName} {props.currency ? `- ${props.currency}$` : null}</h1>
            <h1>Bet: {props.bet}$</h1>
            {
                props.betPhase ?
                    <BetButtons
                        increaseBet={props.increaseBet}
                        placeBet={props.placeBet} /> :
                    null
            }
            <div>

            </div>
            <div className={classes.Cards}>
                {props.player.playerHand.map((h: any) => {
                    return <img src={`http://localhost:5000/gameManager/card-image?cardId=${h.card}.png`}></img>
                })}
            </div>
        </div>
    )
}
