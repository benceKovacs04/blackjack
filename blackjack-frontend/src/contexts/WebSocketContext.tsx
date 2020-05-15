import React, { useRef, useContext, useState } from 'react'
import socketIO from "socket.io-client"
import loggedInContext from './LoggedInContext'

const webSocketContext = React.createContext({
    myTurn: false,
    playerAction: (action: number) => { },
    connect: (tablename: string) => { },
})




export function WebSocketContextWrapper(props: any) {

    const { username } = useContext(loggedInContext)

    const [myTurn, setMyTurn] = useState<boolean>(false)

    const connection: any = useRef();
    const tableName: any = useRef();

    const connect = (tablename: string) => {
        if (connection.current === undefined) {
            tableName.current = tablename
            connection.current = socketIO("http://localhost:5000/game")
            connection.current.on("connected", sitPlayerIn)
            connection.current.on("set_turn", toggleMyTurn)
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

    return (
        <webSocketContext.Provider
            value={{
                myTurn,
                playerAction,
                connect
            }}
        >
            {props.children}
        </webSocketContext.Provider>
    )
}

export default webSocketContext
