import React from 'react'
import classes from './player.module.css'
import BetButtons from './BetButtons/BetButtons'
import { constants } from '../../constants/constants'

export default function Player(props: any) {
    return (
        <div className={classes.Player}>
            <h1>{props.player.playerName} {props.currency ? `- ${props.currency}$` : null}</h1>
            <h1>Bet: {props.bet}$</h1>
            <h1>{props.player.playerHandValue}</h1>
            {
                props.betPhase ?
                    <BetButtons
                        increaseBet={props.increaseBet}
                        placeBet={props.placeBet} /> :
                    null
            }
            <div className={classes.Cards}>
                {props.player.playerHand.map((h: any) => {
                    return <img className={classes.Card} src={`${constants.backendAddress}/gameManager/card-image?cardId=${h.card}.png`}></img>
                })}
            </div>
        </div>
    )
}
