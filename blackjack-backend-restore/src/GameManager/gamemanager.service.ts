import { Injectable } from "@nestjs/common";
import { IGameManagerService } from "./IGameManagerService.interface";
import { Game } from './game/game'
import IPlayer from "./player/IPlayer";
import IGame from "./game/IGame.interface"
import IShoe from "./deck/IShoe";
import Shoe from "./deck/shoe";
import IGameState from "./game/gamestate/IGamestate";
import GameState from "./game/gamestate/gamestate.model";

@Injectable()
export class GameManagerService implements IGameManagerService {

    private readonly games: Array<IGame> = new Array<IGame>()
    private readonly playersAtGames: Array<{ player: IPlayer, game: IGame }> = new Array<{ player: IPlayer, game: IGame }>();

    private readonly emptyGameTimers: Map<IGame, any> = new Map<IGame, any>()

    addNewGame(name: string, owner: string): { name: string, seats: number, owner: string } {
        if (!this.games.find(game => game.getName() === name)) {
            const shoe: IShoe = new Shoe(6);
            const gameState: IGameState = new GameState();
            const game: IGame = new Game(name, owner, shoe, gameState);
            this.games.push(game);
            this.setAutoDeleteOnGame(game);
            return { name: game.getName(), seats: game.getPlayerNum(), owner: game.getOwner() }
        }
    }

    getGamesData(): Array<{ name: string, seats: number, owner: string }> {
        return this.games.map(game => {
            return { name: game.getName(), seats: game.getPlayerNum(), owner: game.getOwner() }
        })
    }

    addPlayerToGame(player: IPlayer, gameName: string): boolean {
        const game = this.games.find(game => game.getName() === gameName)
        if (game) {
            this.playersAtGames.push({ player: player, game: game })
            this.clearAutoDelete(game)
            return game.addPlayer(player)
        }
        return false;
    }

    removePlayerFromGame(player: IPlayer): void {
        const playerMap = this.playersAtGames.find(p => p.player === player)
        if (playerMap) {
            this.playersAtGames.splice(this.playersAtGames.indexOf(playerMap), 1)
            playerMap.game.removePlayer(player);
            if (playerMap.game.getPlayerNum() === 0) {
                this.setAutoDeleteOnGame(playerMap.game)
            }
        }
    }

    deleteGame(gameName: string, loggedInUser: string): void {
        const game = this.games.find(g => g.getName() === gameName)
        if (game !== undefined && game.getOwner() === loggedInUser) {
            this.games.splice(this.games.indexOf(game), 1)
            this.clearAutoDelete(game)
        }
    }

    setAutoDeleteOnGame(game: IGame) {
        this.emptyGameTimers.set(game, setTimeout(() => {
            this.games.splice(this.games.indexOf(game), 1);
            this.emptyGameTimers.delete(game)
        }, 180000));
    }

    clearAutoDelete(game: IGame) {
        if (this.emptyGameTimers.has(game)) {
            clearTimeout(this.emptyGameTimers.get(game))
            this.emptyGameTimers.delete(game)
        }
    }
}