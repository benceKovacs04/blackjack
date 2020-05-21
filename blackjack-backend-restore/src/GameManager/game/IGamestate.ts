export default interface IGameState {
    addCardToPlayer(cardName: string, cardValue: number): void
    addCardToDealer(cardName: string, cardValue: number): void
    getGameState(): { playerHand: string[], playerHandValue: number, dealerHand: string[], dealerHandValue: number, over: boolean }
    resetGameState(): void
    placeBet(amount: number): void
    getBet(): number
}