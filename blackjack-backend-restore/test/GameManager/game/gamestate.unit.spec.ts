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

    describe('addCardToPlayer', () => {
        it('should return object player hand value of 10', async () => {
            gameState.addCardToPlayer("TEST", 10)
            const state = gameState.getPlayerHand()
            expect(state.handValue).toBe(10)
        })

        it('should return object player hand value of 10 with one card: "TEST"', async () => {
            gameState.addCardToPlayer("TEST", 10)
            const result = { cards: ["TEST"], handValue: 10 }
            const state = gameState.getPlayerHand()
            expect(state).toEqual(result)
        })

        it('should add 11 to player hand instead of 1 if handvalue is 10 or under', async () => {
            gameState.addCardToPlayer("TEST", 1)
            const state = gameState.getPlayerHand()
            expect(state.handValue).toEqual(11)
        })

        it('should add 1 to player hand if handvalue is 11 or over', async () => {
            gameState.addCardToPlayer("TEST", 15)
            gameState.addCardToPlayer("TEST", 1)
            const state = gameState.getPlayerHand()
            expect(state.handValue).toEqual(16)
        })

        it('should return 12 if we add two aces', async () => {
            gameState.addCardToPlayer("XA", 1)
            gameState.addCardToPlayer("XA", 1)
            const state = gameState.getPlayerHand()
            expect(state.handValue).toEqual(12)
        })

        it('should downgrade an ace from 11 to 1 value if player would go over blackjack otherwise', async () => {
            gameState.addCardToPlayer("TEST_5", 5)
            gameState.addCardToPlayer("XA", 1)
            gameState.addCardToPlayer("TEST_4", 8)
            const state = gameState.getPlayerHand()
            expect(state.handValue).toEqual(14)
        })
    })


})