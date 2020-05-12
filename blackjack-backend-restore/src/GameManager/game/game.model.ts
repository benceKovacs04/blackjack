import IWebSocketConnection from "./IWebSocketConnection";

export class Game {

    constructor(name: string, socket: IWebSocketConnection) {
        this.name = name;
        this.socketConnection = socket

    }

    private name: string;
    private readonly socketConnection: IWebSocketConnection

    getName(): string {
        return this.name;
    }

    private players: string[] = new Array<string>()

    getPlayerNum(): number {
        return this.players.length
    }

    addPlayer(username: string): Boolean {
        if (this.players.length <= 4) {
            this.players.push(username)
            return true;
        }
        return false;
    }

    removePlayer(username: string): void {
        this.players.splice(this.players.indexOf(username), 1)
    }
}