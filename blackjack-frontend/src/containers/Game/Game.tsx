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
        connection.current.emit("action", 3)
    }

    const sitPlayerIn = () => {

        connection.current.emit("sit_player_in",
            {
                username: username,
                tableName: tableName
            })

    }

    const setGameState = (data: { cards: string[], handValue: number }) => {
        setMyHand(data.cards)
        setMyHandValue(data.handValue)
    }

    const getCard = () => {
        connection.current.emit("action", 1)
    }

    const fold = () => {
        connection.current.emit("action", 0)
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
                        <h1>{myHandValue}</h1>
                        {myTurn ? <div className={classes.Buttons}>
                            <button onClick={getCard} >Hit</button>
                            <button onClick={fold} >Stay</button>
                        </div> : null
                        }
                        {myTurn ? <div>
                            <div className={classes.Cards}>
                                {myHand.map(card =>

                                    <img className={classes.Card} src={`http://localhost:5000/gameManager/card-image?cardId=${card}.png`}></img>

                                )}
                            </div>
                        </div> : null
                        }
                    </div>
                    <div className={classes.OtherPlayer}>

                    </div>
                </div>
            </div>
        </div>
    )
}
