export interface IGameManagerService {
    addNewGame(name: string): { name: string, seats: number }
    getGamesData(): Array<{ name: string, seats: number }>
    addPlayerToGame(player: string, gameName: string): Boolean
    removePlayerFromGame(player: string): void
}