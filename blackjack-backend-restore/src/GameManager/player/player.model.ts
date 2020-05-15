import IPlayer from "./IPlayer";
import { Socket } from "socket.io";

export default class Player implements IPlayer {

    constructor(socket: Socket, username: string) {
        this.socket = socket
        this.username = username
    }


    private readonly socket: Socket
    public readonly username: string

    private action: Action = Action.Tentative;

    initEvents(): void {
        this.socket.on("action", (resp) => { resp == 0 ? this.action = Action.Fold : this.action = Action.Card })
    }

    setTurn(): void {
        this.socket.emit("set_turn")
    }

    endTurn(): void {
        this.setTurn();
        this.action = Action.Tentative;
    }

    getAction(): Action {
        return this.action
    }
}

export enum Action {
    Fold,
    Card,
    Tentative
}