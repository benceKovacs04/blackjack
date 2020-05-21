import IGameState from "../../../src/GameManager/game/IGamestate"
import GameState from "../../../src/GameManager/game/gamestate.model";


describe("GameState", () => {

    let gameState: IGameState;

    beforeEach(() => {
        gameState = new GameState()
    })

    // cards are represented as a string of length 2: 
    // D5 -> diamond 5
    // X5 -> random suite 5
    // XA -> random suite Ace
    // XK -> random suite King
    //
    // needed for the controller to find valid card image
    describe("getGameState", () => {
        describe('addCardToPlayer', () => {
            it('should return object player hand value of 10', async () => {
                gameState.addCardToPlayer("TEST", 10)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toBe(10)
            })

            it('should return object player hand value of 10 with one card: "TEST"', async () => {
                gameState.addCardToPlayer("TEST", 10)
                const result = { playerHand: ["TEST"], playerHandValue: 10, dealerHand: [], dealerHandValue: 0, over: false }
                const state = gameState.getGameState()
                expect(state).toEqual(result)
            })

            it('should add 11 to player hand instead of 1 if handvalue is 10 or under', async () => {
                gameState.addCardToPlayer("TEST", 1)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(11)
            })

            it('should add 1 to player hand if handvalue is 11 or over', async () => {
                gameState.addCardToPlayer("TEST", 15)
                gameState.addCardToPlayer("TEST", 1)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(16)
            })

            it('should return 12 if we add two aces', async () => {
                gameState.addCardToPlayer("XA", 1)
                gameState.addCardToPlayer("XA", 1)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(12)
            })

            it('should downgrade an ace from 11 to 1 value if player would go over blackjack otherwise', async () => {
                gameState.addCardToPlayer("TEST_5", 5)
                gameState.addCardToPlayer("XA", 1)
                gameState.addCardToPlayer("TEST_4", 8)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(14)
            })

            it('should return 25 on a 10, double seven and ace', async () => {
                gameState.addCardToPlayer("TEST_7", 7)
                gameState.addCardToPlayer("TEST_7", 7)
                gameState.addCardToPlayer("XA", 1)
                gameState.addCardToPlayer("TEST_10", 10)
                const state = gameState.getGameState()
                expect(state.playerHandValue).toEqual(25)
            })
        })


        describe('addCardToDealer', () => {
            it('should return object player hand value of 10', async () => {
                gameState.addCardToDealer("TEST", 10)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toBe(10)
            })

            it('should return object player hand value of 10 with one card: "TEST"', async () => {
                gameState.addCardToDealer("TEST", 10)
                const result = { playerHand: [], playerHandValue: 0, dealerHand: ["TEST"], dealerHandValue: 10, over: false }
                const state = gameState.getGameState()
                expect(state).toEqual(result)
            })

            it('should add 11 to player hand instead of 1 if handvalue is 10 or under', async () => {
                gameState.addCardToDealer("TEST", 1)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(11)
            })

            it('should add 1 to player hand if handvalue is 11 or over', async () => {
                gameState.addCardToDealer("TEST", 15)
                gameState.addCardToDealer("TEST", 1)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(16)
            })

            it('should return 12 if we add two aces', async () => {
                gameState.addCardToDealer("XA", 1)
                gameState.addCardToDealer("XA", 1)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(12)
            })

            it('should downgrade an ace from 11 to 1 value if player would go over blackjack otherwise', async () => {
                gameState.addCardToDealer("TEST_5", 5)
                gameState.addCardToDealer("XA", 1)
                gameState.addCardToDealer("TEST_4", 8)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(14)
            })

            it('should return 25 on a 10, double seven and ace', async () => {
                gameState.addCardToDealer("TEST_7", 7)
                gameState.addCardToDealer("TEST_7", 7)
                gameState.addCardToDealer("XA", 1)
                gameState.addCardToDealer("TEST_10", 10)
                const state = gameState.getGameState()
                expect(state.dealerHandValue).toEqual(25)
            })
        })

    })



})