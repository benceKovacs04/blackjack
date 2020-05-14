import IPlayer from "./IPlayer";
import { Socket } from "socket.io";

export default class Player implements IPlayer {

    constructor(socket: Socket, username: string) {
        this.socket = socket
        this.username = username
    }
    async test(): Promise<any> {
        const data = await this.socket.emit("test")
        //console.log(data)
        this.socket.on("asd", (data) => console.log(data + ` ${this.username}`))

    }

    private readonly socket: Socket
    private readonly username: string
}