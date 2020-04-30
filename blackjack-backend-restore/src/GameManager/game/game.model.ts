export class Game {

    constructor(name: string) {
        this.name = name;
    }

    public name: string;
    private players: string[] = new Array<string>()

    getPlayerNum(): number {
        return this.players.length
    }
}