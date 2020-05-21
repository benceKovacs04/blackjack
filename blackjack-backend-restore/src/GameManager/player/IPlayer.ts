import { Action } from "./player.model";

export default interface IPlayer {
    initEvents(): void
    setTurn(): void
    endTurn(): void
    sendGameState(gameState: { playerHand: string[], playerHandValue: number, dealerHand: string[], dealerHandValue: number, over: boolean })
    username: string
    getAvailableCurrency(): number
    setAvailableCurrency(diff: number): void
    actionHandlers: { bet: (amount: number) => void, action: (action: Action) => void }
}