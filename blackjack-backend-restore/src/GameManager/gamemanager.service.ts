import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { IGameManagerService } from "./IGameManagerService.interface";
import { Game } from './game/game.model'
import { pairs } from "rxjs";
import IWebSocketConnection from "./game/IWebSocketConnection";
import { GameGateway } from "./game/game.gateway";


@Injectable()
export class GameManagerService implements IGameManagerService {

    constructor(
        @Inject(forwardRef(() => GameGateway)) private readonly socketConnection: IWebSocketConnection
    ) {

    }
    private readonly games: Array<Game> = new Array<Game>()
    private readonly usersAtGames: Array<{ user: string, game: Game }> = new Array<{ user: string, game: Game }>();

    addNewGame(name: string): { name: string, seats: number } {
        if (!this.games.find(game => game.getName() === name)) {
            const game: Game = new Game(name, this.socketConnection)
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
        this.usersAtGames.push({ user: player, game: game })
        return game.addPlayer(player)

    }

    removePlayerFromGame(player: string): void {
        const playerMap = this.usersAtGames.find(p => p.user === player)
        this.usersAtGames.splice(this.usersAtGames.indexOf(playerMap), 1)
        playerMap.game.removePlayer(player);
    }


}