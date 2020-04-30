export interface IGameManagerService {
    addNewGame(name: string): { name: string, seats: number }
    getGamesData(): Array<{ name: string, seats: number }>
}