import IPlayer from "../player/IPlayer";
import { Action } from "../player/player.model";
import IShoe from "../deck/IShoe";
import IGameState from "./IGamestate";
import GameState from "./gamestate.model";
import { stat } from "fs";

export class Game {

    constructor(name: string, shoe: IShoe) {
        this.name = name;
        this.shoe = shoe
    }

    private name: string;
    private players: IPlayer[] = new Array<IPlayer>()

    private activePlayer: IPlayer;

    private timerID: any

    private shoe: IShoe
    private usedCards: number = 0;

    private gameState: IGameState = new GameState();

    getName(): string {
        return this.name;
    }

    getPlayerNum(): number {
        return this.players.length
    }

    addPlayer(player: IPlayer): boolean {
        if (this.players.length <= 3) {
            player.initEvents()
            this.players.push(player)
            if (this.players.length == 1) {
                this.activePlayer = player
                this.activePlayer.setTurn()
                this.startSimulation()
            }
            return true;
        }
        return false;
    }

    removePlayer(player: IPlayer): void {
        if (this.players.length === 1) {
            this.activePlayer = null
            this.gameState.resetGameState()
        }
        if (player === this.activePlayer) {
            this.nextPlayer();
        }
        this.players.splice(this.players.indexOf(player), 1)
        if (this.players.length === 0) {
            clearInterval(this.timerID)
        }
    }

    startSimulation() {
        this.timerID = setInterval(this.simulate.bind(this), 2000)
    }

    nextPlayer() {
        this.activePlayer.endTurn()
        this.gameState.resetGameState()
        const activeIndex = this.players.indexOf(this.activePlayer)

        this.activePlayer = this.players[(activeIndex + 1) % this.players.length]

        this.activePlayer.setTurn()
        this.startSimulation()
    }

    simulate() {
        if ((this.shoe.getShoeSize() * 52) * 0.25 < this.usedCards) {
            this.shoe.resetShoe()
        }

        const action = this.activePlayer.getAction();

        switch (action) {
            case Action.Waiting:
                const cardOne = this.shoe.getCard()
                const cardTwo = this.shoe.getCard()
                this.gameState.addCardToPlayer(cardOne, this.shoe.getCardValue(cardOne))
                this.gameState.addCardToPlayer(cardTwo, this.shoe.getCardValue(cardTwo))
                this.activePlayer.sendGameState(this.gameState.getPlayerHand())
                break;
            case Action.Hit:
                const card = this.shoe.getCard()
                this.gameState.addCardToPlayer(card, this.shoe.getCardValue(card))
                this.activePlayer.sendGameState(this.gameState.getPlayerHand())
                break;
            case Action.Fold:
                break;
            case Action.Tentative:
                break;
        }
    }
}