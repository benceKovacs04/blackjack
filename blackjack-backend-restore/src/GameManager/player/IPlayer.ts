import { Action } from "./player.model";

export default interface IPlayer {
    initEvents(): void
    setTurn(): void
    endTurn(): void
    getAction(): Action
    username: string
}