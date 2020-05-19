import IGameState from "./IGamestate";

export default class GameState implements IGameState {
    addCardToPlayer(cardName: string, cardValue: number): void {
        throw new Error("Method not implemented.");
    }
    addCardToDealer(cardName: string, cardValue: number): void {
        throw new Error("Method not implemented.");
    }
    getPlayerHand(): { cards: string[]; handValue: number; } {
        throw new Error("Method not implemented.");
    }
    getDealerHand(): { cards: string[]; handValue: number; } {
        throw new Error("Method not implemented.");
    }
    resetGameState(): void {
        throw new Error("Method not implemented.");
    }



}