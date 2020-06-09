import PlayerState from "./playerState.model";
import Card from "src/GameManager/UtilModels/Card.model";

export default interface IGameState {
    addPlayerToState(name: string): boolean
    removePlayerFromState(name: string): void
    addCardToPlayer(card: Card, playerName: string): void
    addCardToDealer(card: Card): void
    resetState(): void
    getGameState(): {
        players: PlayerState[],
        dealer: { dealerHand: Array<Card>, dealerHandValue: number }
    }
    placeBet(playerName: string, amount: number): void
    getNrOfBets(): number
}