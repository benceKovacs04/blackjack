import IWebSocketConnection from "./IWebSocketConnection";
import IPlayer from "../player/IPlayer";


export class Game {

    constructor(name: string) {
        this.name = name;
    }

    private name: string;
    private players: IPlayer[] = new Array<IPlayer>()

    getName(): string {
        return this.name;
    }

    getPlayerNum(): number {
        return this.players.length
    }

    addPlayer(player: IPlayer): Boolean {
        if (this.players.length <= 3) {
            this.players.push(player)
            return true;
        }
        return false;
    }

    removePlayer(player: IPlayer): void {
        this.players.splice(this.players.indexOf(player), 1)
    }
}