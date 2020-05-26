import { Game } from "../../../src/GameManager/game/game.model"
import IShoe from "../../../src/GameManager/deck/IShoe"
import Shoe from "../../../src/GameManager/deck/shoe"
import IPlayer from "../../../src/GameManager/player/IPlayer"
import PlayerState from "../../../src/GameManager/game/gamestate/playerState.model"
import { Action } from "../../../src/GameManager/player/player.model"
import IGameState from "../../../src/GameManager/game/gamestate/IGamestate"
import GameState from "../../../src/GameManager/game/gamestate/gamestate.model"


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
    actionHandlers: { bet: (amount: number, username: string) => void; action: (action: Action, username: string) => void } = null

    setBettingPhaseOnPlayer(remainingTime: number): void {
        return
    }

    MOCK_BET() {
        this.actionHandlers.bet(10, "TEST")
    }

    MOCK_STAY() {
        this.actionHandlers.action(Action.Stay, this.username)
    }

    MOCK_HIT() {
        this.actionHandlers.action(Action.Hit, this.username)
    }
}

class MockShoe implements IShoe {
    getCard(): string {
        return "TEST"
    }
    getCardValue(card: string): number {
        return 10
    }
    resetShoe(): void {
        return
    }
    getShoeSize(): number {
        return
    }
}

describe("Game", () => {

    jest.useFakeTimers()

    let game: Game
    let player: PlayerMock;
    let gameState: IGameState
    let shoe: IShoe

    beforeEach(() => {
        shoe = new Shoe(6)
        gameState = new GameState()
        game = new Game("test_game", shoe, gameState)
        player = new PlayerMock()
        player.username = "TEST"
    })

    describe("addPlayer", () => {


        it("players list length should be 1 after adding one player", () => {
            game.addPlayer(player)
            const result = game.getPlayerNum()
            expect(result).toEqual(1)
        })

        it("should return false on tring adding a fourth player", () => {
            game.addPlayer(player)
            game.addPlayer(new PlayerMock())
            game.addPlayer(new PlayerMock())
            const result = game.addPlayer(new PlayerMock())
            expect(result).toBe(false)
        })

        it("player action handlers should not be null after adding player", () => {
            game.addPlayer(player)
            expect(player.actionHandlers).not.toBeNull()
        })

        it("player should have been called on adding player to game", () => {
            player.initEvents = jest.fn()
            game.addPlayer(player)
            expect(player.initEvents).toHaveBeenCalled()
        })
    })

    describe('removePlayer', () => {

        it("should remove player from game on removePlayer", () => {
            game.removePlayer(player)
            expect(game.getPlayerNum()).toEqual(0)
        })
    })
    describe('Phase handling', () => {

        describe('handleBetting', () => {

            it("on adding first player, game should start betting phase, should call askForBet on player", () => {
                player.setBettingPhaseOnPlayer = jest.fn()
                game.addPlayer(player)
                expect(player.setBettingPhaseOnPlayer).toHaveBeenCalled()
            })

            it("should notify player on betting phase if player joins during the betting phase", () => {
                const playerTwo = new PlayerMock()
                playerTwo.setBettingPhaseOnPlayer = jest.fn()
                game.addPlayer(player);
                jest.advanceTimersByTime(4000)
                game.addPlayer(playerTwo)
                expect(playerTwo.setBettingPhaseOnPlayer).toHaveBeenCalledTimes(1)
            })

            it("should not notify player on betting phase if player joins during the betting phase, and theres less then 4 seconds left", () => {
                const playerTwo = new PlayerMock()
                playerTwo.setBettingPhaseOnPlayer = jest.fn()
                game.addPlayer(player);
                jest.advanceTimersByTime(8000)
                game.addPlayer(playerTwo)
                expect(playerTwo.setBettingPhaseOnPlayer).not.toHaveBeenCalled()
            })

            it("should start dealing cards if every player (one player here) placed in the bets", () => {
                player.setBettingPhaseOnPlayer = jest.fn()
                game.addPlayer(player)
                expect(player.setBettingPhaseOnPlayer).toHaveBeenCalledWith(10)
                player.MOCK_BET()
                expect(player.setBettingPhaseOnPlayer).toHaveBeenCalledWith(0)
            })

            it(" --COPY-- should start dealing cards if every player (one player here) placed in the bets", () => {
                let gameState = new GameState()
                let shoe: IShoe = new Shoe(6)
                let game = new Game("test_game", shoe, gameState)
                player = new PlayerMock()
                player.username = "TEST"
                player.setBettingPhaseOnPlayer = jest.fn()
                game.addPlayer(player)
                expect(player.setBettingPhaseOnPlayer).toHaveBeenCalledWith(10)
                player.MOCK_BET()
                expect(player.setBettingPhaseOnPlayer).toHaveBeenCalledWith(0)
            })

        })

        describe("handleInitialHand", () => {

            it("should notify every player at the end of the betting phase", () => {
                const playerTwo = new PlayerMock()
                player.setBettingPhaseOnPlayer = jest.fn()
                playerTwo.setBettingPhaseOnPlayer = jest.fn()
                game.addPlayer(player)
                game.addPlayer(playerTwo)
                jest.advanceTimersByTime(10000)
                expect(player.setBettingPhaseOnPlayer).toHaveBeenCalledWith(0)
                expect(playerTwo.setBettingPhaseOnPlayer).toHaveBeenCalledWith(0)
            })

            it("should start dealing cards 2 seconds after betting phase is over", () => {
                player.sendGameState = jest.fn()
                game.addPlayer(player)
                jest.advanceTimersByTime(6000)
                expect(player.sendGameState).toHaveBeenCalledTimes(0)
                jest.advanceTimersByTime(6000)
                expect(player.sendGameState).toHaveBeenCalledTimes(1)
            })

            it('player should receive two gamestate update on initial hand dealing 3 seconds after bettingphase is over', () => {
                player.sendGameState = jest.fn()
                game.addPlayer(player)
                jest.advanceTimersByTime(13000)
                expect(player.sendGameState).toHaveBeenCalledTimes(2)
            })

            it("should set player as active after the initial hand deal", () => {
                player.setTurn = jest.fn()
                game.addPlayer(player)
                player.MOCK_BET()
                jest.advanceTimersByTime(30000)
                expect(player.setTurn).toHaveBeenCalled()
            })
        })

        describe("handlePlayerDecision", () => {


            it("should end players turn if palyer is tentative for 10 seconds", () => {
                let playerTwo = new PlayerMock();
                player.setTurn = jest.fn();
                playerTwo.setTurn = jest.fn();
                game.addPlayer(player);
                game.addPlayer(playerTwo);
                player.MOCK_BET();
                playerTwo.MOCK_BET();
                jest.advanceTimersByTime(6000);
                expect(player.setTurn).toHaveBeenCalled()
                expect(playerTwo.setTurn).not.toHaveBeenCalled()
                jest.advanceTimersByTime(10000)
                expect(playerTwo.setTurn).toHaveBeenCalled()
            })

            it("should set player two as active palyer if player 1 stays", () => {
                let playerTwo = new PlayerMock()
                playerTwo.setTurn = jest.fn()
                game.addPlayer(player);
                game.addPlayer(playerTwo);
                player.MOCK_BET();
                playerTwo.MOCK_BET();
                jest.advanceTimersByTime(6000);
                player.MOCK_STAY()
                expect(playerTwo.setTurn).toHaveBeenCalled()
            })

            it("should send a state update on player HIT", () => {
                game.addPlayer(player);
                player.MOCK_BET();
                jest.advanceTimersByTime(6000);
                expect(player.state.length).toEqual(2)
                player.MOCK_HIT()
                expect(player.state.length).toEqual(3)
            })

            it("should set next player as active if active player busts", () => {
                game = new Game("test", new MockShoe(), gameState)
                const playerTwo = new PlayerMock()
                playerTwo.setTurn = jest.fn()
                game.addPlayer(player)
                game.addPlayer(playerTwo)
                player.MOCK_BET()
                playerTwo.MOCK_BET()
                jest.advanceTimersByTime(6000);
                player.MOCK_HIT()
                expect(playerTwo.setTurn).toHaveBeenCalled()
            })

        })

        describe("DealDealer", () => {

            it("dealer should have 2 cards and none of them should be 'back_card'", () => {
                game.addPlayer(player)
                player.MOCK_BET()
                jest.advanceTimersByTime(6000);
                player.MOCK_STAY()

                while (gameState.getGameState().dealer.dealerHandValue < 17) {
                    jest.advanceTimersByTime(1000)
                }

                expect(gameState.getGameState().dealer.dealerHandValue).toBeGreaterThan(17)
            })
        })
    })
})