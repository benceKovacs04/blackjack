import { Injectable } from "@nestjs/common";
import { IGameManagerService } from "./IGameManagerService.interface";
import { Game } from './game/game.model'
import IPlayer from "./player/IPlayer";
import IShoe from "./deck/IShoe";
import Shoe from "./deck/shoe";
import IGameState from "./game/gamestate/IGamestate";
import GameState from "./game/gamestate/gamestate.model";

@Injectable()
export class GameManagerService implements IGameManagerService {

    private readonly games: Array<Game> = new Array<Game>()
    private readonly playersAtGames: Array<{ player: IPlayer, game: Game }> = new Array<{ player: IPlayer, game: Game }>();

    addNewGame(name: string): { name: string, seats: number } {
        if (!this.games.find(game => game.getName() === name)) {
            const shoe: IShoe = new Shoe(6)
            const gameState: IGameState = new GameState()
            const game: Game = new Game(name, shoe, gameState)
            this.games.push(game)
            return { name: game.getName(), seats: game.getPlayerNum() }
        }
    }

    getGamesData(): Array<{ name: string, seats: number }> {
        return this.games.map(game => {
            return { name: game.getName(), seats: game.getPlayerNum() }
        })
    }

    addPlayerToGame(player: IPlayer, gameName: string): boolean {
        const game = this.games.find(game => game.getName() === gameName)
        if (game) {
            this.playersAtGames.push({ player: player, game: game })
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