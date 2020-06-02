import IPlayer from "./player/IPlayer";


export interface IGameManagerService {
    addNewGame(name: string, owner: string): { name: string, seats: number, owner: string }
    getGamesData(): Array<{ name: string, seats: number, owner: string }>
    addPlayerToGame(player: IPlayer, gameName: string): Boolean
    removePlayerFromGame(player: IPlayer): void
    deleteGame(gameName: string): void
}