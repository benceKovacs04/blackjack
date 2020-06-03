import React, { useState, useContext, useEffect, useRef } from 'react'
import classes from './Game.module.css'
import loggedInContext from '../../contexts/LoggedInContext'
import socketIO from "socket.io-client"
import Player from '../../components/Player/Player'
import Dealer from '../../components/Player/Dealer'
import { constants } from '../../constants/constants'

export default function Game(props: any) {

    const { username, loggedIn } = useContext(loggedInContext)
    const [tableName, setTableName] = useState<string>(props.match.params.name)

    const [bet, setBet] = useState<number>(0)
    const [availableCurrency, setAvailableCurrency] = useState<number>(0)

    const [players, setPlayers] = useState<any[]>([]);
    const [isBetPhase, setBetPhase] = useState<boolean>(false)
    const [betTimer, setBetTimer] = useState<number>(0)
    const [myTurn, setMyTurn] = useState<boolean>(false)
    const [result, setResult] = useState<string>("")
    const [dealer, setDealer] = useState<any>()

    const connection: any = useRef();

    useEffect(() => {
        if (loggedIn) {
            if (connection.current === undefined) {
                connection.current = socketIO(`${constants.backendAddress}/game`)
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
        setDealer(data.dealer)
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
                <div className={classes.TableName}>
                    <h1>Table: {tableName}</h1>
                </div>
                <div className={classes.Dealer}>
                    {betTimer > 0 ? <h1>Remaining time to bet: {betTimer}</h1> : dealer ? <Dealer dealer={dealer} /> : null}
                </div>
                {myTurn ?
                    <div className={classes.Actions}>
                        <button onClick={stay}>Stay</button>
                        <button onClick={hit}>Hit</button>
                    </div> : <div className={classes.Actions}><h1>{result}</h1></div>
                }
                <div className={classes.Players}>
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
