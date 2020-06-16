import { Game } from "../../../src/GameManager/game/game"
import IShoe from "../../../src/GameManager/deck/IShoe"
import Shoe from "../../../src/GameManager/deck/shoe"
import IPlayer from "../../../src/GameManager/player/IPlayer"
import PlayerState from "../../../src/GameManager/game/gamestate/playerState.model"
import { Action } from "../../../src/GameManager/player/player.model"
import IGameState from "../../../src/GameManager/game/gamestate/IGamestate"
import GameState from "../../../src/GameManager/game/gamestate/gamestate.model"
import Card from "../../../src/GameManager/UtilModels/Card.model"


class PlayerMock implements IPlayer {
    state = []
    username: string

    initEvents(): void {
        return
    }
    setTurn(): void {
        return
    }
    endTurn(): void {
        return
    }
    sendGameState(gameState: { players: PlayerState[]; dealer: { dealerHand: Card[]; dealerHandValue: number } }) {
        this.state.push(gameState)
    }
    getAvailableCurrency(): number {
        return
    }
    setAvailableCurrency(diff: number): void {
        return
    }

    actionHandlers: { bet: (bet: { amount: number, username: string }) => void, action: (action: Action, username: string) => void }

    setBettingPhaseOnPlayer(remainingTime: number): void {
        return
    }

    MOCK_BET() {
        this.actionHandlers.bet({ amount: 10, username: this.username })
    }

    MOCK_STAY() {
        this.actionHandlers.action(Action.Stay, this.username)
    }

    MOCK_HIT() {
        this.actionHandlers.action(Action.Hit, this.username)
    }
    sendTimer(remainingTime: number): void {
        return
    }
    sendRoundResult(result: string): void {
        return
    }
}

class MockShoe implements IShoe {
    getCard(): Card {
        return new Card("TEST", 10);
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
        game = new Game("test_game", "test_owner", shoe, gameState)
        player = new PlayerMock()
        player.username = "TEST"
    })

    describe("addPlayer", () => {


        it("players list length should be 1 after adding one player", () => {
            game.addPlayer(player)
            const result = game.getPlayerNum()
            expect(result).toEqual(1)
        })

        it("should return false on trying adding a fourth player", () => {
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
            game.addPlayer(player)
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

            it("players should receive two gamestate update. one at adding player to game, one at betting phase start", () => {
                player.sendGameState = jest.fn();
                game.addPlayer(player);
                jest.advanceTimersByTime(10000);
                expect(player.sendGameState).toHaveBeenCalledTimes(2);
            })

        })

        describe("handleInitialHand", () => {

            it("should notify every player at the end of the betting phase", () => {
                const playerTwo = new PlayerMock()
                player.setBettingPhaseOnPlayer = jest.fn()
                playerTwo.setBettingPhaseOnPlayer = jest.fn()
                game.addPlayer(player)
                game.addPlayer(playerTwo)
                player.MOCK_BET();
                jest.advanceTimersByTime(10000)
                expect(player.setBettingPhaseOnPlayer).toHaveBeenLastCalledWith(0)
                expect(playerTwo.setBettingPhaseOnPlayer).toHaveBeenLastCalledWith(0)
            })

            it("should start dealing cards 2 seconds after betting phase is over", () => {
                player.sendGameState = jest.fn()
                game.addPlayer(player)
                jest.advanceTimersByTime(6000)
                expect(player.sendGameState).toHaveBeenCalledTimes(2)
                jest.advanceTimersByTime(6000)
                expect(player.sendGameState).toHaveBeenCalledTimes(3)
            })

            it('player should receive two gamestate update on initial hand dealing 3 seconds after bettingphase is over(receives 2 in batting phase)', () => {
                player.sendGameState = jest.fn()
                game.addPlayer(player)
                player.MOCK_BET();
                jest.advanceTimersByTime(3000)
                expect(player.sendGameState).toHaveBeenCalledTimes(4)
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

            it("should end players turn if player is tentative for 10 seconds", () => {
                let playerTwo = new PlayerMock();
                playerTwo.username = "TEST_PLAYER_TWO"
                player.endTurn = jest.fn();
                playerTwo.setTurn = jest.fn();
                game.addPlayer(player);
                game.addPlayer(playerTwo);
                player.MOCK_BET();
                playerTwo.MOCK_BET();
                jest.advanceTimersByTime(6000);
                expect(playerTwo.setTurn).not.toHaveBeenCalled()
                jest.advanceTimersByTime(10000)
                expect(player.endTurn).toHaveBeenCalled();
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
                expect(player.state.length).toEqual(4)
                player.MOCK_HIT()
                expect(player.state.length).toEqual(5)
            })

            it("should set next player as active if active player busts", () => {
                game = new Game("test", "test-owner", new MockShoe(), gameState)
                const playerTwo = new PlayerMock()
                playerTwo.username = "TEST_PLAYER_TWO"
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

        /*describe("DealDealer", () => {
            beforeEach(() => {
                game.addPlayer(player)
                player.MOCK_BET()
                jest.advanceTimersByTime(6000);
                player.MOCK_STAY()
            })

            it("dealer should have 2 cards and none of them should be 'back_card'", () => {
                while (gameState.getGameState().dealer.dealerHandValue < 17) {
                    jest.advanceTimersByTime(1000)
                }

                expect(gameState.getGameState().dealer.dealerHandValue).toBeGreaterThan(17)
            })
        })*/
    })
})