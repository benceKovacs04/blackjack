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

    sendInitialHand(cardOne: string, cardTwo: string): void {
        this.socket.emit("initial_hand", [cardOne, cardTwo])
        this.action = Action.Tentative
    }
}

export enum Action {
    Fold,
    Card,
    Tentative,
    Waiting
}