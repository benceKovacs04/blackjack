import IWebSocketConnection from "./IWebSocketConnection";

export class Game {

    constructor(name: string, socketConnection: IWebSocketConnection) {
        this.name = name;
        this.connection = socketConnection
    }

    private name: string;
    private readonly connection: IWebSocketConnection
    private players: string[] = new Array<string>()

    getName(): string {
        return this.name;
    }

    getPlayerNum(): number {
        return this.players.length
    }

    addPlayer(username: string): Boolean {
        this.connection.alert(username)
        if (this.players.length <= 3) {
            this.players.push(username)
            return true;
        }
        return false;
    }

    removePlayer(username: string): void {
        this.players.splice(this.players.indexOf(username), 1)
    }
}