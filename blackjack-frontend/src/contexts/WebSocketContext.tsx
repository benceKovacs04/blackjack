import React, { useRef, useContext } from 'react'
import socketIO from "socket.io-client"
import loggedInContext from './LoggedInContext'

const webSocketContext = React.createContext({
    connect: (tablename: string) => { },
})




export function WebSocketContextWrapper(props: any) {

    const { username } = useContext(loggedInContext)

    const connection: any = useRef();
    const tableName: any = useRef();

    const connect = (tablename: string) => {
        if (connection.current === undefined) {
            tableName.current = tablename
            connection.current = socketIO("http://localhost:5000/game")
            connection.current.on("connected", sendUsername)
            connection.current.on("username_mapped", sitPlayerIn)
        }

    }

    const sendUsername = () => {
        connection.current.emit("map_username", username)
    }

    const sitPlayerIn = (didPlayerMap: Boolean) => {
        if (didPlayerMap) {
            connection.current.emit("sit_player_in",
                {
                    username: username,
                    tableName: tableName.current
                })
        }
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
