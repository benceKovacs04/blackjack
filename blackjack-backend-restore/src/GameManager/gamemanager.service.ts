import { Injectable } from "@nestjs/common";
import { IGameManagerService } from "./IGameManagerService.interface";

@Injectable()
export class GameManagerService implements IGameManagerService {

    private readonly lobbies: Array<string> = new Array<string>()

    addNewLobby(name: string): string {
        if (this.lobbies.find(lobby => lobby === name) === undefined) {
            this.lobbies.push(name)
            return name
        }
    }

    getLobbies(): string[] {
        return [...this.lobbies]
    }

}