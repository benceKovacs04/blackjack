import IPlayer from "./IPlayer";
import { Socket } from "socket.io";
import PlayerState from "../game/gamestate/playerState.model";

export default class Player implements IPlayer {

    constructor(socket: Socket, username: string) {
        this.socket = socket
        this.username = username
    }

    private readonly socket: Socket
    public readonly username: string

    private availableCurrency: number = 2500;

    initEvents(): void {
        this.socket.on("action", (resp) => { this.actionHandlers.action(Action[resp], this.username) })
        this.socket.on("place-bet", (data) => {
            this.actionHandlers.bet(data)
            this.setAvailableCurrency(data.amount * -1)
        })
    }

    setBettingPhaseOnPlayer(remainingTime: number): void {
        this.socket.emit("bet-phase", remainingTime)
    }

    sendTimer(remainingTime: number): void {
        this.socket.emit("bet-timer", remainingTime)
    }
    setTurn(): void {
        this.socket.emit("set_turn")
    }

    endTurn(): void {
        this.setTurn();
    }

    sendGameState(gameState: { players: PlayerState[]; dealer: { dealerHand: { card: string; value: number; }[]; dealerHandValue: number; }; }) {
        gameState["availableCurrency"] = this.availableCurrency;
        this.socket.emit("game-state", gameState)
    }


    getAvailableCurrency(): number {
        return this.availableCurrency
    }

    setAvailableCurrency(diff: number): void {
        this.availableCurrency += diff
    }

    sendRoundResult(result: string): void {
        this.socket.emit("round-result", result)
    }

    actionHandlers: { bet: (bet: { amount: number, username: string }) => void; action: (action: Action, username: string) => void; };
}

export enum Action {
    Stay = "Stay",
    Hit = "Hit",
}