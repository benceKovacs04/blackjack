import IPlayer from "./player/IPlayer";

export interface IGameManagerService {
    addNewGame(name: string): { name: string, seats: number }
    getGamesData(): Array<{ name: string, seats: number }>
    addPlayerToGame(player: IPlayer, gameName: string): Boolean
    removePlayerFromGame(player: IPlayer): void
}