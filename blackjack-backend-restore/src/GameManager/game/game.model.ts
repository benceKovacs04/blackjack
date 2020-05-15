import IPlayer from "../player/IPlayer";
import { Action } from "../player/player.model";
import { TreeChildren } from "typeorm";


export class Game {

    constructor(name: string) {
        this.name = name;
    }

    private name: string;
    private players: IPlayer[] = new Array<IPlayer>()

    private activePlayer: IPlayer;

    private timerID: any

    getName(): string {
        return this.name;
    }

    getPlayerNum(): number {
        return this.players.length
    }

    addPlayer(player: IPlayer): Boolean {
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
        if (activeIndex + 1 == this.players.length) {
            this.activePlayer = this.players[0]
        } else {
            this.activePlayer = this.players[activeIndex + 1]
        }
        this.activePlayer.setTurn()
        this.startSimulation()
    }

    simulate() {
        const action = this.activePlayer.getAction();
        if (action === Action.Card) {
            console.log(`${this.activePlayer.username} draw a card`)
        }
        else if (action === Action.Fold) {
            clearInterval(this.timerID)
            console.log(`${this.activePlayer.username} folded`)
            this.nextPlayer()
        }
        else if (action === Action.Tentative) {
            console.log(`${this.activePlayer.username} is tentative in ${this.name} room!`)
        }
    }
}