import IShoe from "./IShoe";

export default class Shoe implements IShoe {

    constructor(nrOfDecks: number) {
        this.initShoe(nrOfDecks)
    }

    private readonly fullShoe: Map<string, number> = new Map<string, number>([
        ["CA", 0], ["C2", 0], ["C3", 0], ["C4", 0],
        ["C5", 0], ["C6", 0], ["C7", 0], ["C8", 0],
        ["C9", 0], ["C10", 0], ["CJ", 0], ["CQ", 0], ["CK", 0],
        ["DA", 0], ["D2", 0], ["D3", 0], ["D4", 0],
        ["D5", 0], ["D6", 0], ["D7", 0], ["D8", 0],
        ["D9", 0], ["D10", 0], ["DJ", 0], ["DQ", 0], ["DK", 0],
        ["HA", 0], ["H2", 0], ["H3", 0], ["H4", 0],
        ["H5", 0], ["H6", 0], ["H7", 0], ["H8", 0],
        ["H9", 0], ["H10", 0], ["HJ", 0], ["HQ", 0], ["HK", 0],
        ["SA", 0], ["S2", 0], ["S3", 0], ["S4", 0],
        ["S5", 0], ["S6", 0], ["S7", 0], ["S8", 0],
        ["S9", 0], ["S10", 0], ["SJ", 0], ["SQ", 0], ["SK", 0],
    ])

    private initShoe(nrOfDecks: number): void {
        for (let key of this.fullShoe.keys()) {
            this.fullShoe[key] = nrOfDecks
        }
    }
    getCard(): string {
        const keys = Array.from(this.fullShoe.keys());
        let rndKey = keys[Math.floor(Math.random() * keys.length)]
        while (this.fullShoe[rndKey] === 0) {
            rndKey = keys[Math.floor(Math.random() * keys.length)]
        }
        this.fullShoe[rndKey] = this.fullShoe[rndKey] - 1
        return rndKey
    }


}