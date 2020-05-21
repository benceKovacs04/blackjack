import IGameState from "./IGamestate";

export default class GameState implements IGameState {

    private playerHand: Array<{ card: string, value: number }> = new Array<{ card: string, value: number }>()
    private playerHandValue: number = 0
    private dealerHand: Array<{ card: string, value: number }> = new Array<{ card: string, value: number }>()
    private dealerHandValue: number = 0
    private bet: number = 0;

    private calculateValueToAdd(cardValue: number, handValue: number, hand: Array<{ card: string, value: number }>) {
        let valueToAdd = cardValue;
        if (cardValue + handValue > 21 && hand.find(c => c.card[1] == 'A' && c.value === 11)) {
            const ace = hand.find(c => c.card[1] == 'A' && c.value === 11)
            ace.value = 1;
        }
        if (cardValue === 1 && handValue <= 10) {
            valueToAdd = 11
        }
        return valueToAdd
    }

    addCardToPlayer(cardName: string, cardValue: number): void {
        const valueToAdd = this.calculateValueToAdd(cardValue, this.playerHandValue, this.playerHand)
        this.playerHand.push({ card: cardName, value: valueToAdd })
        this.playerHandValue = this.playerHand.map(c => c.value).reduce((a, b) => a + b, 0)



    }

    addCardToDealer(cardName: string, cardValue: number): void {
        const valueToAdd = this.calculateValueToAdd(cardValue, this.dealerHandValue, this.dealerHand)
        this.dealerHand.push({ card: cardName, value: valueToAdd })
        this.dealerHandValue = this.dealerHand.map(c => c.value).reduce((a, b) => a + b, 0)
    }

    getPlayerHand(): { cards: string[]; handValue: number; over: boolean } {
        const cardArray = this.playerHand.map(c => c.card)
        return { cards: cardArray, handValue: this.playerHandValue, over: false }
    }

    getDealerHand(): { cards: string[]; handValue: number; } {
        const cardArray = this.dealerHand.map(c => c.card)
        return { cards: cardArray, handValue: this.dealerHandValue }
    }

    resetGameState(): void {
        this.playerHand = new Array<{ card: string, value: number }>()
        this.playerHandValue = 0
        this.dealerHand = new Array<{ card: string, value: number }>()
        this.dealerHandValue = 0
    }

    placeBet(amount: number): void {
        this.bet = amount
    }

    getBet(): number {
        return this.bet
    }

}