import { Game } from "../../../src/GameManager/game/game.model"
import IShoe from "../../../src/GameManager/deck/IShoe"
import Shoe from "../../../src/GameManager/deck/shoe"
import IPlayer from "../../../src/GameManager/player/IPlayer"
import PlayerState from "../../../src/GameManager/game/gamestate/playerState.model"
import { Action } from "../../../src/GameManager/player/player.model"
import { TableForeignKey } from "typeorm"


class PlayerMock implements IPlayer {
    state = []
    username: string
    asd: Action

    initEvents(): void {
        return
    }
    setTurn(): void {
        return
    }
    endTurn(): void {
        return
    }
    sendGameState(gameState: { players: PlayerState[]; dealer: { dealerHand: { card: string; value: number }[]; dealerHandValue: number } }) {
        this.state.push(gameState)
    }
    getAvailableCurrency(): number {
        return
    }
    setAvailableCurrency(diff: number): void {
        return
    }
    actionHandlers: { bet: (amount: number) => void; action: (action: Action) => void } = null
    askForBet(): void {
        return
    }




}

describe("Game", () => {

    let game: Game
    let player: IPlayer;

    beforeEach(() => {
        let shoe: IShoe = new Shoe(6)
        game = new Game("test_game", shoe)
        player = new PlayerMock()
    })

    describe("addPlayer", async () => {

        it("players list length should be 1 after adding one player", async () => {
            game.addPlayer(player)
            const result = game.getPlayerNum()
            expect(result).toEqual(1)
        })

        it("should return false on tring adding a fourth player", async () => {
            game.addPlayer(player)
            game.addPlayer(new PlayerMock())
            game.addPlayer(new PlayerMock())
            const result = game.addPlayer(new PlayerMock())
            expect(result).toBe(false)
        })

        it("player action handlers should not be null after adding player", async () => {
            game.addPlayer(player)
            expect(player.actionHandlers).not.toBeNull()
        })

        it("player should have been called on adding player to game", async () => {
            player.initEvents = jest.fn()
            game.addPlayer(player)
            expect(player.initEvents).toHaveBeenCalled()
        })
    })

    describe('removePlayer', async () => {
        beforeEach(() => {
            game.addPlayer(player)
        })

        it("should remove player from game on removePlayer", async () => {
            game.removePlayer(player)
            expect(game.getPlayerNum()).toEqual(0)
        })

    })
})