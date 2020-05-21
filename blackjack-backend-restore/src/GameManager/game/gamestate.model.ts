import IGameState from "./IGamestate";

export default class GameState implements IGameState {

    private playerHand: string[] = []
    private playerHandValue: number = 0
    private dealerHand: string[] = []
    private dealerHandValue: number = 0
    private bet: number = 0;

    private calculateValueToAdd(cardValue: number, handValue: number, hand: string[]) {
        let valueToAdd = cardValue;
        if (cardValue + handValue > 21 && hand.find(c => c[1] === "A")) {
            valueToAdd -= 10;
        }
        if (cardValue === 1 && handValue <= 10) {
            valueToAdd = 11
        }
        return valueToAdd
    }

    addCardToPlayer(cardName: string, cardValue: number): void {
        const valueToAdd = this.calculateValueToAdd(cardValue, this.playerHandValue, this.playerHand)
        this.playerHand.push(cardName)
        this.playerHandValue += valueToAdd

    }

    addCardToDealer(cardName: string, cardValue: number): void {
        const valueToAdd = this.calculateValueToAdd(cardValue, this.dealerHandValue, this.dealerHand)
        this.dealerHand.push(cardName)
        this.dealerHandValue += valueToAdd
    }

    getPlayerHand(): { cards: string[]; handValue: number; over: boolean } {
        return { cards: this.playerHand, handValue: this.playerHandValue, over: false }
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

    placeBet(amount: number): void {
        this.bet = amount
    }

}