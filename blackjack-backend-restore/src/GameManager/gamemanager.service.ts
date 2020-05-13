import { Injectable, Inject } from "@nestjs/common";
import { IGameManagerService } from "./IGameManagerService.interface";
import { Game } from './game/game.model'
import { pairs } from "rxjs";
import IWebSocketConnection from "./game/IWebSocketConnection";


@Injectable()
export class GameManagerService implements IGameManagerService {

    constructor(
        //@Inject("IWebSocketConnection") private readonly socketConnection: IWebSocketConnection
    ) { }

    private readonly games: Array<Game> = new Array<Game>()
    private readonly playersAtGames: Array<{ player: string, game: Game }> = new Array<{ player: string, game: Game }>();

    addNewGame(name: string): { name: string, seats: number } {
        if (!this.games.find(game => game.getName() === name)) {
            //const game: Game = new Game(name, this.socketConnection)
            const game: Game = new Game(name)
            this.games.push(game)
            return { name: game.getName(), seats: game.getPlayerNum() }
        }
    }

    getGamesData(): Array<{ name: string, seats: number }> {
        return this.games.map(game => {
            return { name: game.getName(), seats: game.getPlayerNum() }
        })
    }

    addPlayerToGame(player: string, gameName: string): Boolean {
        const game = this.games.find(game => game.getName() === gameName)
        this.playersAtGames.push({ player: player, game: game })
        return game.addPlayer(player)

    }

    removePlayerFromGame(player: string): void {
        const playerMap = this.playersAtGames.find(p => p.player === player)
        this.playersAtGames.splice(this.playersAtGames.indexOf(playerMap), 1)
        playerMap.game.removePlayer(player);
    }


}