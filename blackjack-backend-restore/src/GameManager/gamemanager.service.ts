import { Injectable } from "@nestjs/common";
import { IGameManagerService } from "./IGameManagerService.interface";
import { Game } from './game/game.model'

@Injectable()
export class GameManagerService implements IGameManagerService {

    private readonly lobbies: Array<Game> = new Array<Game>()

    addNewGame(name: string): string {
        if (!this.lobbies.find(game => game.name === name)) {
            const game: Game = new Game(name)
            this.lobbies.push(game)
            return game.name
        }
    }

    getGameNames(): string[] {
        return this.lobbies.map(game => {
            return game.name;
        })
    }

}