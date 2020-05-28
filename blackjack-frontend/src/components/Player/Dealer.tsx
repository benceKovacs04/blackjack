import React from 'react'

export default function Dealer(props: any) {
    return (
        <div>
            <h1>{props.dealer.dealerHandValue}</h1>
            {props.dealer.dealerHand.map((h: any) => {
                return <img src={`http://localhost:5000/gameManager/card-image?cardId=${h.card}.png`}></img>
            })}
        </div>
    )
}
