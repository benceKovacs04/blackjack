import React, { useState, useContext, useEffect, useRef } from 'react'
import classes from './Game.module.css'
import loggedInContext from '../../contexts/LoggedInContext'
import socketIO from "socket.io-client"

export default function Game(props: any) {

    const { username, loggedIn } = useContext(loggedInContext)
    const [tableName, setTableName] = useState<string>(props.match.params.name)
    const [myTurn, setMyTurn] = useState<boolean>(false)
    const [myHand, setMyHand] = useState<string[]>([])
    const [myHandValue, setMyHandValue] = useState<number>(0)
    const [bet, setBet] = useState<number>(0)

    const connection: any = useRef();

    useEffect(() => {
        if (loggedIn) {
            if (connection.current === undefined) {
                connection.current = socketIO("http://localhost:5000/game")
                connection.current.on("connected", sitPlayerIn)
                connection.current.on("set_turn", toggleMyTurn)
                connection.current.on("game-state", setGameState)
            }

        }
    }, [])

    const toggleMyTurn = () => {
        setMyTurn(myTurn => !myTurn)
        //connection.current.emit("action", "Waiting")
    }

    const sitPlayerIn = () => {

        connection.current.emit("sit_player_in",
            {
                username: username,
                tableName: tableName
            })

    }

    const setGameState = (data: { cards: string[], handValue: number }) => {
        setTimeout("", 2000)
        setMyHand(data.cards)
        setMyHandValue(data.handValue)
    }

    const increaseBet = (value: number) => {
        setBet(bet => bet += value)
    }

    const hit = () => {
        connection.current.emit("action", "Hit")
    }

    const stay = () => {
        connection.current.emit("action", "Stay")
    }

    return (
        <div className={classes.Background}>
            <div className={classes.Table}>
                <h1>{tableName}</h1>
                <div className={classes.Dealer}>

                </div>
                <div className={classes.Players}>
                    <div className={classes.OtherPlayer}>

                    </div>
                    <div className={classes.Player}>
                        <h1>{username}</h1>
                        {myTurn ? <h1>{bet}$</h1> : null}

                        {myTurn ?
                            [myHand.length > 0 ?
                                <div>
                                    <h1>{myHandValue}</h1>
                                    <div className={classes.Actions}>
                                        <button onClick={hit} >Hit</button>
                                        <button onClick={stay} >Stay</button>
                                    </div>
                                    <div>
                                        <div className={classes.Cards}>
                                            {myHand.map(card =>
                                                <img className={classes.Card} src={`http://localhost:5000/gameManager/card-image?cardId=${card}.png`}></img>
                                            )}
                                        </div>
                                    </div>
                                </div> :
                                <div className={classes.Bet}>
                                    <div className={classes.Buttons}>
                                        <button>Bet</button>
                                        <button onClick={() => increaseBet(1)}>1$</button>
                                        <button onClick={() => increaseBet(10)}>10$</button>
                                        <button onClick={() => increaseBet(50)}>50$</button>
                                        <button onClick={() => increaseBet(100)}>100$</button>
                                        <button onClick={() => increaseBet(200)}>200$</button>
                                        <button onClick={() => increaseBet(500)}>500$</button>
                                        <button onClick={() => increaseBet(-1 * bet)}>Reset</button>
                                    </div>
                                </div>]
                            : null
                        }
                    </div>
                    <div className={classes.OtherPlayer}>

                    </div>
                </div>
            </div>
        </div>
    )
}
