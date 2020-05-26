import IGameState from "../../../src/GameManager/game/gamestate/IGamestate";
import GameState from "../../../src/GameManager/game/gamestate/gamestate.model";


describe("GameState", () => {


    // cards are represented as a string of length 2: 
    // D5 -> diamond 5
    // X5 -> random suite 5
    // XA -> random suite Ace
    // XK -> random suite King
    //
    // needed for the controller to find valid card image


    describe("getGameState", () => {

        let gameState: IGameState

        describe("addPlayerToState", () => {

            beforeEach(() => {
                gameState = new GameState()
            })
            it("should add player 'TEST' to player list", () => {
                gameState.addPlayerToState("TEST")
                const state = gameState.getGameState()
                expect(state.players[0].playerName).toEqual("TEST")
            })

            it("should add 3 players, player list length should be 3", () => {
                gameState.addPlayerToState("TEST_1")
                gameState.addPlayerToState("TEST_2")
                gameState.addPlayerToState("TEST_3")
                const state = gameState.getGameState()
                expect(state.players.length).toEqual(3)
            })

            it("should return false on tryng to add a fourth player", () => {
                gameState.addPlayerToState("TEST_1")
                gameState.addPlayerToState("TEST_2")
                gameState.addPlayerToState("TEST_3")
                const result = gameState.addPlayerToState("TEST_4")
                expect(result).toEqual(false)

            })
        })

        describe("removePlayerFromState", () => {
            beforeEach(() => {
                gameState = new GameState()
                gameState.addPlayerToState("TEST")
            })

            it("should remove TEST player from state", () => {
                gameState.removePlayerFromState("TEST")
                expect(gameState.getGameState().players.length).toEqual(0)
            })

            it("should remove TEST player from state, first element of player array should be TEST_2", () => {
                gameState.addPlayerToState("TEST_2")
                gameState.removePlayerFromState("TEST")
                expect(gameState.getGameState().players[0].playerName).toEqual("TEST_2")
            })
        })

        describe("addCardToPlayer", () => {
            beforeEach(() => {
                gameState = new GameState()
                gameState.addPlayerToState("TEST_PLAYER_ONE")
                gameState.addPlayerToState("TEST_PLAYER_TWO")
                gameState.addPlayerToState("TEST_PLAYER_THREE")
            })

            it("should add card of value 10 to TEST_PLAYER_ONE, TEST_PLAYER_ONE should have a hand value of 10", () => {
                gameState.addCardToPlayer("X10", 10, "TEST_PLAYER_ONE")
                const state = gameState.getGameState()
                expect(state.players[0].playerHandValue).toEqual(10)
            })

            it("should return 'TEST' named card after adding it to TEST_PLAYER_ONE", () => {
                gameState.addCardToPlayer("TEST", 0, "TEST_PLAYER_ONE")
                const state = gameState.getGameState()
                expect(state.players[0].playerHand[0].card).toEqual("TEST")
            })

            it("ace should add 11 to TEST_PLAYER_ONE instead of 1 if hand value is 10 or under", () => {
                gameState.addCardToPlayer("XA", 1, "TEST_PLAYER_ONE")
                const state = gameState.getGameState()
                expect(state.players[0].playerHandValue).toEqual(11)
            })

            describe("playceBet", () => {
                beforeEach(() => {
                    gameState = new GameState()
                })

                it("should place bet to player 'TEST' (10)", () => {
                    gameState.addPlayerToState("TEST")
                    gameState.placeBet("TEST", 10)
                    const playerState = gameState.getGameState().players.find(p => p.playerName === "TEST")
                    expect(playerState.bet).toEqual(10)
                })

                it("should place bet to player 'TEST_2' (10)", () => {
                    gameState.addPlayerToState("TEST")
                    gameState.addPlayerToState("TEST_2")
                    gameState.placeBet("TEST_2", 10)
                    const test = gameState.getGameState().players.find(p => p.playerName === "TEST")
                    const test_2 = gameState.getGameState().players.find(p => p.playerName === "TEST_2")
                    expect(test.bet).toBeUndefined()
                    expect(test_2.bet).toEqual(10)
                })
            })
        })
        /*
    
        

        

            it('should add 11 to player hand instead of 1 if handvalue is 10 or under',  () => {
                gameState.addCardToPlayer("TEST", 1)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(11)
            })

            it('should add 1 to player hand if handvalue is 11 or over',  () => {
                gameState.addCardToPlayer("TEST", 15)
                gameState.addCardToPlayer("TEST", 1)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(16)
            })

            it('should return 12 if we add two aces',  () => {
                gameState.addCardToPlayer("XA", 1)
                gameState.addCardToPlayer("XA", 1)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(12)
            })

            it('should downgrade an ace from 11 to 1 value if player would go over blackjack otherwise',  () => {
                gameState.addCardToPlayer("TEST_5", 5)
                gameState.addCardToPlayer("XA", 1)
                gameState.addCardToPlayer("TEST_4", 8)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(14)
            })

            it('should return 25 on a 10, double seven and ace',  () => {
                gameState.addCardToPlayer("TEST_7", 7)
                gameState.addCardToPlayer("TEST_7", 7)
                gameState.addCardToPlayer("XA", 1)
                gameState.addCardToPlayer("TEST_10", 10)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(25)
            })
        })


        describe('addCardToDealer', () => {
            it('should return object player hand value of 10',  () => {
                gameState.addCardToDealer("TEST", 10)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toBe(10)
            })

            it('should return object player hand value of 10 with one card: "TEST"',  () => {
                gameState.addCardToDealer("TEST", 10)
                const result = { playerHand: [], playerHandValue: 0, dealerHand: ["TEST"], dealerHandValue: 10, over: false }
                const state = gameState.getGameState()
                expect(state).toEqual(result)
            })

            it('should add 11 to player hand instead of 1 if handvalue is 10 or under',  () => {
                gameState.addCardToDealer("TEST", 1)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(11)
            })

            it('should add 1 to player hand if handvalue is 11 or over',  () => {
                gameState.addCardToDealer("TEST", 15)
                gameState.addCardToDealer("TEST", 1)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(16)
            })

            it('should return 12 if we add two aces',  () => {
                gameState.addCardToDealer("XA", 1)
                gameState.addCardToDealer("XA", 1)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(12)
            })

            it('should downgrade an ace from 11 to 1 value if player would go over blackjack otherwise',  () => {
                gameState.addCardToDealer("TEST_5", 5)
                gameState.addCardToDealer("XA", 1)
                gameState.addCardToDealer("TEST_4", 8)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(14)
            })

            it('should return 25 on a 10, double seven and ace',  () => {
                gameState.addCardToDealer("TEST_7", 7)
                gameState.addCardToDealer("TEST_7", 7)
                gameState.addCardToDealer("XA", 1)
                gameState.addCardToDealer("TEST_10", 10)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(25)
            })
        })*/

    })



})