import React, { useRef, useContext, useState } from 'react'
import socketIO from "socket.io-client"
import loggedInContext from './LoggedInContext'

const webSocketContext = React.createContext({
    myTurn: false,
    myHand: [""],
    playerAction: (action: number) => { },
    connect: (tablename: string) => { }
})


export function WebSocketContextWrapper(props: any) {

    const { username } = useContext(loggedInContext)

    const [myTurn, setMyTurn] = useState<boolean>(false)
    const [myHand, setMyHand] = useState<string[]>([])

    const connection: any = useRef();
    const tableName: any = useRef();

    const connect = (tablename: string) => {
        if (connection.current === undefined) {
            tableName.current = tablename
            connection.current = socketIO("http://localhost:5000/game")
            connection.current.on("connected", sitPlayerIn)
            connection.current.on("set_turn", toggleMyTurn)
            connection.current.on("initial_hand", setInitialHand)
        }

    }

    const toggleMyTurn = () => {
        setMyTurn(myTurn => !myTurn)
    }

    const sitPlayerIn = () => {

        connection.current.emit("sit_player_in",
            {
                username: username,
                tableName: tableName.current
            })

    }

    const playerAction = (action: number) => {
        connection.current.emit("action", action)
    }

    const setInitialHand = (data: []) => {
        setMyHand(myHand => myHand.concat(data))
    }

    return (
        <webSocketContext.Provider
            value={{
                myTurn,
                myHand,
                playerAction,
                connect
            }}
        >
            {props.children}
        </webSocketContext.Provider>
    )
}

export default webSocketContext
