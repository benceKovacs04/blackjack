import React, { useState, useContext, useEffect, useRef } from 'react'
import classes from './Game.module.css'
import loggedInContext from '../../contexts/LoggedInContext'
import socketIO from "socket.io-client"
import Player from '../../components/Player/Player'

export default function Game(props: any) {

    const { username, loggedIn } = useContext(loggedInContext)
    const [tableName, setTableName] = useState<string>(props.match.params.name)

    const [bet, setBet] = useState<number>(0)
    const [availableCurrency, setAvailableCurrency] = useState<number>(0)


    //const [disableActionButtons, setDisabeActionButton] = useState<boolean>(false)

    const [players, setPlayers] = useState<any[]>([]);
    const [isBetPhase, setBetPhase] = useState<boolean>(false)
    const [betTimer, setBetTimer] = useState<number>(0)
    const [myTurn, setMyTurn] = useState<boolean>(false)
    const [result, setResult] = useState<string>("")

    const connection: any = useRef();

    useEffect(() => {
        if (loggedIn) {
            if (connection.current === undefined) {
                connection.current = socketIO("http://localhost:5000/game")
                connection.current.on("connected", sitPlayerIn)
                connection.current.on("game-state", setGameState)
                connection.current.on("bet-phase", betPhase)
                connection.current.on("bet-timer", (time: number) => setBetTimer(time))
                connection.current.on("set_turn", toggleMyTurn)
                connection.current.on("round-result", showResult)
            }

        }
    }, [])

    const betPhase = (remTime: number) => {
        setResult("")
        if (remTime > 0) {
            setBetPhase(true)
            setBetTimer(remTime)
        } else {
            setBetPhase(false)
            setBetTimer(0)
        }
    }

    const toggleMyTurn = () => {
        setMyTurn(myTurn => !myTurn)
    }

    const sitPlayerIn = () => {

        connection.current.emit("sit_player_in",
            {
                username: username,
                tableName: tableName
            })

    }

    const setGameState = (data: any) => {
        setPlayers(data.players)
        setAvailableCurrency(data.availableCurrency)
    }


    const increaseBet = (value: number) => {
        if (value + bet <= availableCurrency) {
            setBet(bet => bet += value)
        }
    }

    const placeBet = () => {
        if (bet > 0 && bet <= availableCurrency) {
            connection.current.emit("place-bet", { amount: bet, username: username })
            setAvailableCurrency(availableCurrency => availableCurrency - bet)
        }
    }

    const hit = () => {
        connection.current.emit("action", "Hit")
    }

    const stay = () => {
        connection.current.emit("action", "Stay")
    }

    const showResult = (res: string) => {
        setBet(0)
        setResult(res)
    }

    return (
        <div className={classes.Background}>
            <div className={classes.Table}>
                <h1>{tableName}</h1>
                <div className={classes.Dealer}>
                    {betTimer > 0 ? <h1>Remaining time to bet: {betTimer}</h1> : null}
                </div>
                {myTurn ?
                    <div className={classes.Actions}>
                        <button onClick={stay}>Stay</button>
                        <button onClick={hit}>Hit</button>
                    </div> : <h1>{result}</h1>
                }
                <div className={classes.Players}>
                    {/*    <div className={classes.OtherPlayer}>

                    </div>
                    <div className={classes.Player}>
                        <h1>{username} - {availableCurrency}$</h1>
                        {myTurn ? <h1>{bet}$</h1> : null}

                        {myTurn ?
                            [myHand.length > 0 ?
                                <div className={classes.Hand}>
                                    <h1>{myHandValue}</h1>
                                    {disableActionButtons ? null : <div className={classes.Actions}>
                                        <button onClick={hit} >Hit</button>
                                        <button onClick={stay} >Stay</button>
                                    </div>}
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
                                        <button onClick={placeBet}>Bet</button>
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
                    */}
                    {players.map(p => {
                        if (p.playerName === username) {
                            return <Player
                                increaseBet={increaseBet}
                                placeBet={placeBet}
                                betPhase={isBetPhase}
                                bet={bet}
                                currency={availableCurrency}
                                player={p} />
                        }
                        return <Player bet={p.bet} player={p} />
                    })}
                </div>
            </div>
        </div>
    )
}
