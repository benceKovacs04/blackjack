import IPlayer from "./IPlayer";
import { Socket } from "socket.io";

export default class Player implements IPlayer {

    constructor(socket: Socket, username: string) {
        this.socket = socket
        this.username = username
    }

    private readonly socket: Socket
    public readonly username: string

    initEvents(): void {
        this.socket.on("action", (resp) => { this.actionMethod(Action[Action[resp]]) })
    }

    setTurn(): void {
        this.socket.emit("set_turn")
    }

    endTurn(): void {
        this.setTurn();
    }

    sendGameState(gameState: { cards: string[]; handValue: number; }) {
        this.socket.emit("game-state", gameState)
    }

    actionMethod: (action: Action) => void;

}

export enum Action {
    Stay,
    Hit,
    Tentative,
    Waiting
}