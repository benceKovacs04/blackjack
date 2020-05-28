import { Action } from "./player.model";
import PlayerState from "../game/gamestate/playerState.model";

export default interface IPlayer {
    initEvents(): void
    setTurn(): void
    endTurn(): void
    sendGameState(gameState: { players: PlayerState[]; dealer: { dealerHand: { card: string; value: number; }[]; dealerHandValue: number; }; })
    username: string
    getAvailableCurrency(): number
    setAvailableCurrency(diff: number): void
    actionHandlers: { bet: (bet: { amount: number, username: string }) => void, action: (action: Action, username: string) => void }
    setBettingPhaseOnPlayer(remainingTime: number): void
    sendTimer(remainingTime: number): void
    sendRoundResult(result: string): void
}