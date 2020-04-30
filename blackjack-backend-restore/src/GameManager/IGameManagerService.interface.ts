export interface IGameManagerService {
    addNewLobby(name: string): string
    getLobbies(): Array<string>
}