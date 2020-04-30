import { Injectable } from "@nestjs/common";
import { IGameManagerService } from "./IGameManagerService.interface";
import { Game } from './game/game.model'

@Injectable()
export class GameManagerService implements IGameManagerService {

    private readonly lobbies: Array<Game> = new Array<Game>()

    addNewGame(name: string): { name: string, seats: number } {
        if (!this.lobbies.find(game => game.name === name)) {
            const game: Game = new Game(name)
            this.lobbies.push(game)
            return { name: game.name, seats: game.getPlayerNum() }
        }
    }

    getGamesData(): Array<{ name: string, seats: number }> {
        return this.lobbies.map(game => {
            return { name: game.name, seats: game.getPlayerNum() }
        })
    }


}