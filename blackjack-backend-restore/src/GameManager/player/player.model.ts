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
        this.socket.on("action", (resp) => { this.actionHandlers.action(Action[resp]) })
        this.socket.on("place-bet", this.actionHandlers.bet)
    }

    setBettingPhaseOnPlayer(remainingTime: number): void {
        this.socket.emit("bet-phase", remainingTime)
    }

    setTurn(): void {
        this.socket.emit("set_turn", this.availableCurrency)
    }

    endTurn(): void {
        this.setTurn();
    }

    sendGameState(gameState: { players: PlayerState[]; dealer: { dealerHand: { card: string; value: number; }[]; dealerHandValue: number; }; }) {
        this.socket.emit("game-state", gameState)
    }


    getAvailableCurrency(): number {
        return this.availableCurrency
    }

    setAvailableCurrency(diff: number): void {
        this.availableCurrency += diff
    }

    actionHandlers: { bet: (amount: number) => void; action: (action: Action) => void; };
}

export enum Action {
    Stay = "Stay",
    Hit = "Hit",
    Tentative = "Tentative",
    Deal = "Deal",
    Bet = "Bet"
}