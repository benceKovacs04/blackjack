export default interface IGameState {
    addCardToPlayer(cardName: string, cardValue: number): void
    addCardToDealer(cardName: string, cardValue: number): void
    getPlayerHand(): { cards: string[], handValue: number }
    getDealerHand(): { cards: string[], handValue: number }
    resetGameState(): void
    placeBet(amount: number): void
}