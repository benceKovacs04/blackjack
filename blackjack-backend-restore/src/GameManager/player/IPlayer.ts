import { Action } from "./player.model";

export default interface IPlayer {
    initEvents(): void
    setTurn(): void
    endTurn(): void
    sendGameState(gameState: { cards: string[], handValue: number, over: boolean })
    username: string
    getAvailableCurrency(): number
    setAvailableCurrency(diff: number): void
    //actionMethod: (action: any) => void
    actionHandlers: { bet: (amount: number) => void, action: (action: Action) => void }
}