import IWebSocketConnection from "./IWebSocketConnection";
import Player from "./player.model";

export class Game {

    constructor(name: string, socketConnection: IWebSocketConnection) {
        this.name = name;
        this.connection = socketConnection
    }

    private name: string;
    private readonly connection: IWebSocketConnection
    private players: Player[] = new Array<Player>()

    getName(): string {
        return this.name;
    }

    getPlayerNum(): number {
        return this.players.length
    }

    addPlayer(username: string): Boolean {
        this.connection.alert(username)
        if (this.players.length <= 3) {
            this.players.push(new Player(username))
            return true;
        }
        return false;
    }

    removePlayer(username: string): void {
        this.players.splice(this.players.indexOf(this.players.find(p => p.getName() === username)), 1)
    }
}