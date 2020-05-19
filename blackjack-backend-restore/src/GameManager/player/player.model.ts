import IPlayer from "./IPlayer";
import { Socket } from "socket.io";

export default class Player implements IPlayer {

    constructor(socket: Socket, username: string) {
        this.socket = socket
        this.username = username
    }


    private readonly socket: Socket
    public readonly username: string

    private action: Action = Action.Waiting;

    initEvents(): void {
        this.socket.on("action", (resp) => { this.action = Action[Action[resp]] })
    }

    setTurn(): void {
        this.socket.emit("set_turn")
    }

    endTurn(): void {
        this.setTurn();
        this.action = Action.Waiting;
    }

    getAction(): Action {
        return this.action
    }

    sendGameState(gameState: { cards: string[]; handValue: number; }) {
        this.socket.emit("game-state", gameState)
        this.action = Action.Tentative
    }

}

export enum Action {
    Fold,
    Hit,
    Tentative,
    Waiting
}