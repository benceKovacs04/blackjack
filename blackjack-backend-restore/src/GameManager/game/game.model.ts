export class Game {

    constructor(name: string) {
        this.name = name;
    }

    public name: string;
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