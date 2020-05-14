import { Injectable } from "@nestjs/common";
import { IGameManagerService } from "./IGameManagerService.interface";
import { Game } from './game/game.model'
import IPlayer from "./player/IPlayer";

@Injectable()
export class GameManagerService implements IGameManagerService {

    private readonly games: Array<Game> = new Array<Game>()
    private readonly playersAtGames: Array<{ player: IPlayer, game: Game }> = new Array<{ player: string, game: Game }>();

    addNewGame(name: string): { name: string, seats: number } {
        if (!this.games.find(game => game.getName() === name)) {
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

    addPlayerToGame(player: IPlayer, gameName: string): Boolean {
        const game = this.games.find(game => game.getName() === gameName)
        if (game) {
            this.playersAtGames.push({ player: player, game: game })
            console.log(this.playersAtGames)
            return game.addPlayer(player)
        }
        return false;

    }

    removePlayerFromGame(player: IPlayer): void {
        const playerMap = this.playersAtGames.find(p => p.player === player)
        if (playerMap) {
            this.playersAtGames.splice(this.playersAtGames.indexOf(playerMap), 1)
            playerMap.game.removePlayer(player);
        }
    }


}