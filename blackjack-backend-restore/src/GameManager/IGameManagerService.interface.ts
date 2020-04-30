export interface IGameManagerService {
    addNewGame(name: string): string
    getGameNames(): Array<string>
}