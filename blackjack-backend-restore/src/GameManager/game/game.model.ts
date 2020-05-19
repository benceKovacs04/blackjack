import IPlayer from "../player/IPlayer";
import { Action } from "../player/player.model";
import IShoe from "../deck/IShoe";

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
                this.activePlayer.sendInitialHand(cardOne, cardTwo)
                break;
            case Action.Hit:
                break;
            case Action.Fold:
                break;
            case Action.Tentative:
                break;
        }
    }
}