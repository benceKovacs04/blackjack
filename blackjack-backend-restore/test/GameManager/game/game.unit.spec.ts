import { Game } from "../../../src/GameManager/game/game.model"
import IShoe from "../../../src/GameManager/deck/IShoe"
import Shoe from "../../../src/GameManager/deck/shoe"
import IPlayer from "../../../src/GameManager/player/IPlayer"
import PlayerState from "../../../src/GameManager/game/gamestate/playerState.model"
import { Action } from "../../../src/GameManager/player/player.model"
import IGameState from "../../../src/GameManager/game/gamestate/IGamestate"
import GameState from "src/GameManager/game/gamestate/gamestate.model"


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

class MockGameState implements IGameState {
    addPlayerToState(name: string): boolean {
        return true;
    }
    removePlayerFromState(name: string): void {
        return
    }
    addCardToPlayer(card: string, value: number, playerName: string): void {
        return
    }
    addCardToDealer(card: string, value: number): void {
        return
    }
    resetState(): void {
        return
    }
    getGameState(): { players: PlayerState[]; dealer: { dealerHand: { card: string; value: number }[]; dealerHandValue: number } } {
        return
    }
    placeBet(playerName: string, amount: number): void {
        return
    }
    getNrOfBets(): number {
        return
    }

}

describe("Game", () => {

    let game: Game
    let player: IPlayer;
    let gameState: IGameState = new GameState()

    beforeEach(() => {
        let shoe: IShoe = new Shoe(6)
        game = new Game("test_game", shoe, gameState)
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

    describe('handleBetting', async () => {
        beforeEach(() => {

        })

        it("on adding first player, game should start betting phase, should call askForBet on player", async () => {
            player.askForBet = jest.fn()
            game.addPlayer(player)
            expect(player.askForBet).toHaveBeenCalled()
        })
    })
})