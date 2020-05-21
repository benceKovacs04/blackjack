import PlayerState from "./playerState.model";

export default interface IGameState {
    addPlayerToState(name: string): boolean
    removePlayerFromState(name: string): void
    addCardToPlayer(card: string, value: number, playerName: string): void
    addCardToDealer(card: string, value: number): void
    resetState(): void
    getGameState(): {
        players: PlayerState[],
        dealer: { dealerHand: Array<{ card: string, value: number }>, dealerHandValue: number }
    }
    placeBet(playerName: string, amount: number): void
    getNrOfBets(): number
}