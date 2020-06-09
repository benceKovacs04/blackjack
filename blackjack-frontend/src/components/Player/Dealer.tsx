import React from 'react'
import classes from './player.module.css'
import { constants } from "../../constants/constants"

export default function Dealer(props: any) {
    return (
        <div className={classes.Dealer}>
            <h1>{props.dealer.dealerHandValue}</h1>
            <div>
                {props.dealer.dealerHand.map((h: any) => {
                    return <img src={`${constants.backendAddress}/gameManager/card-image?cardId=${h.name}.png`}></img>
                })}
            </div>
        </div>
    )
}
