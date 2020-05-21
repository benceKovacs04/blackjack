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
    actionHandlers: { bet: (amount: number) => void, action: (action: Action) => void }
    askForBet(): void
}