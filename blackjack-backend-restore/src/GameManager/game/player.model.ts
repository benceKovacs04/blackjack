export default class Player {

    constructor(name: string) {
        this.name = name
    }

    private name: string
    private money: number = 1000

    getName(): string {
        return this.name;
    }
}