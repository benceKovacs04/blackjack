import React from 'react'
import classes from './player.module.css'

export default function Dealer(props: any) {
    return (
        <div className={classes.Dealer}>
            <h1>{props.dealer.dealerHandValue}</h1>
            <div>
                {props.dealer.dealerHand.map((h: any) => {
                    return <img src={`http://localhost:5000/gameManager/card-image?cardId=${h.card}.png`}></img>
                })}
            </div>
        </div>
    )
}
