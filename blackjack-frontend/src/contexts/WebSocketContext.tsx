import React, { useRef, useContext } from 'react'
import socketIO from "socket.io-client"
import loggedInContext from './LoggedInContext'

const webSocketContext = React.createContext({
    connect: () => { },
})




export function WebSocketContextWrapper(props: any) {

    const { username } = useContext(loggedInContext)

    const connection: any = useRef();

    const connect = () => {
        if (connection.current === undefined) {
            connection.current = socketIO("http://localhost:5000/game")
            connection.current.on("connected", sendUsername)
        }

    }

    const sendUsername = () => {
        connection.current.emit("map_username", username)
    }

    return (
        <webSocketContext.Provider
            value={{
                connect
            }}
        >
            {props.children}
        </webSocketContext.Provider>
    )
}

export default webSocketContext
