import IGameState from "./IGamestate";

export default class GameState implements IGameState {

    private playerHand: string[] = []
    private playerHandValue: number = 0
    private dealerHand: string[] = []
    private dealerHandValue: number = 0

    addCardToPlayer(cardName: string, cardValue: number): void {
        if (cardValue + this.playerHandValue > 21 && this.playerHand.find(c => c[1] === "A")) {
            this.playerHandValue -= 10;
            this.playerHand.push(cardName)
            this.playerHandValue += cardValue
            return
        }
        if (cardValue === 1 && this.playerHandValue <= 10) {
            this.playerHand.push(cardName)
            this.playerHandValue += 11;
            return
        }
        this.playerHand.push(cardName)
        this.playerHandValue += cardValue
    }
    addCardToDealer(cardName: string, cardValue: number): void {
        this.dealerHand.push(cardName)
        this.dealerHandValue += cardValue
    }
    getPlayerHand(): { cards: string[]; handValue: number; } {
        return { cards: this.playerHand, handValue: this.playerHandValue }
    }
    getDealerHand(): { cards: string[]; handValue: number; } {
        return { cards: this.dealerHand, handValue: this.dealerHandValue }
    }
    resetGameState(): void {
        this.playerHand = []
        this.playerHandValue = 0
        this.dealerHand = []
        this.dealerHandValue = 0
    }



}