import IGameState from "../../../src/GameManager/game/gamestate/IGamestate";
import GameState from "../../../src/GameManager/game/gamestate/gamestate.model";
import Card from "../../../src/GameManager/UtilModels/Card.model";


describe("GameState", () => {


    // cards are represented as a string of length 2: 
    // D5 -> diamond 5
    // X5 -> random suite 5
    // XA -> random suite Ace
    // XK -> random suite King
    //
    // needed for the controller to find valid card image

    let gameState: IGameState;

    beforeEach(() => {
        gameState = new GameState();
    })

    describe("getGameState", () => {

        describe("addPlayerToState", () => {

            it("should add player 'TEST' to player list", () => {
                gameState.addPlayerToState("TEST");
                const state = gameState.getGameState();
                expect(state.players[0].playerName).toEqual("TEST");
            })

            it("should add 3 players, player list length should be 3", () => {
                gameState.addPlayerToState("TEST_1");
                gameState.addPlayerToState("TEST_2");
                gameState.addPlayerToState("TEST_3");
                const state = gameState.getGameState();
                expect(state.players.length).toEqual(3);
            })

            it("should return false on tryng to add a fourth player", () => {
                gameState.addPlayerToState("TEST_1");
                gameState.addPlayerToState("TEST_2");
                gameState.addPlayerToState("TEST_3");
                const result = gameState.addPlayerToState("TEST_4");
                expect(result).toEqual(false);

            })
        })

        describe("removePlayerFromState", () => {
            beforeEach(() => {
                gameState.addPlayerToState("TEST");
            })

            it("should remove TEST player from state", () => {
                gameState.removePlayerFromState("TEST");
                expect(gameState.getGameState().players.length).toEqual(0);
            })

            it("should remove TEST player from state, first element of player array should be TEST_2", () => {
                gameState.addPlayerToState("TEST_2");
                gameState.removePlayerFromState("TEST");
                expect(gameState.getGameState().players[0].playerName).toEqual("TEST_2");
            })
        })

        describe("placeBet", () => {

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
                expect(test.bet).toEqual(0)
                expect(test_2.bet).toEqual(10)
            })
        })

        describe("addCardToPlayer", () => {

            beforeEach(() => {
                gameState.addPlayerToState("TEST_PLAYER_ONE");
                gameState.addPlayerToState("TEST_PLAYER_TWO");
                gameState.placeBet("TEST_PLAYER_ONE", 1);
            })

            it("should not add card to player if player didn't place a bet", () => {
                const card: Card = new Card("X10", 10);
                gameState.addCardToPlayer(card, "TEST_PLAYER_TWO");
                const state = gameState.getGameState();
                expect(state.players[0].playerHandValue).toEqual(0);
            })

            it("should add a card of value of 10 to TEST_PLAYER_ONE, this player should have a hand value of 10", () => {
                const card: Card = new Card("X10", 10);
                gameState.addCardToPlayer(card, "TEST_PLAYER_ONE");
                const state = gameState.getGameState();
                expect(state.players[0].playerHandValue).toEqual(10);
            })
            it("should return 'TEST' named card after adding it to TEST_PLAYER_ONE", () => {
                const card: Card = new Card("TEST", 0);
                gameState.addCardToPlayer(card, "TEST_PLAYER_ONE");
                const state = gameState.getGameState();
                expect(state.players[0].playerHand[0].name).toBe("TEST");
            })

            it("ace should add 11 to TEST_PLAYER_ONE instead of 1 if hand value is 10 or under", () => {
                const card: Card = new Card("XA", 1);
                gameState.addCardToPlayer(card, "TEST_PLAYER_ONE")
                const state = gameState.getGameState()
                expect(state.players[0].playerHandValue).toEqual(11)
            })


            it('ace should add 1 to player hand if handvalue is 11 or over', () => {
                const card1: Card = new Card("TEST", 11);
                const card2: Card = new Card("XA", 1);
                gameState.addCardToPlayer(card1, "TEST_PLAYER_ONE")
                gameState.addCardToPlayer(card2, "TEST_PLAYER_ONE")
                const state = gameState.getGameState()
                expect(state.players[0].playerHandValue).toEqual(12)
            })

            it('player handvalue should be 12 if we add two aces', () => {
                const card1: Card = new Card("XA", 1);
                const card2: Card = new Card("XA", 1);
                gameState.addCardToPlayer(card1, "TEST_PLAYER_ONE");
                gameState.addCardToPlayer(card2, "TEST_PLAYER_ONE");
                const state = gameState.getGameState()
                expect(state.players[0].playerHandValue).toEqual(12)
            })

            it('should downgrade an ace from 11 to 1 value if player would go over 21 otherwise', () => {
                const card1: Card = new Card("X10", 10);
                const card2: Card = new Card("XA", 1);
                const card3: Card = new Card("X4", 4);
                gameState.addCardToPlayer(card1, "TEST_PLAYER_ONE");
                gameState.addCardToPlayer(card2, "TEST_PLAYER_ONE");
                gameState.addCardToPlayer(card3, "TEST_PLAYER_ONE");
                const state = gameState.getGameState()
                expect(state.players[0].playerHandValue).toEqual(15)
            })

            it('should return 25 on double 7, then ace, then 10', () => {
                const card1: Card = new Card("X7", 7);
                const card2: Card = new Card("X7", 7);
                const card3: Card = new Card("XA", 1);
                const card4: Card = new Card("X10", 10);
                gameState.addCardToPlayer(card1, "TEST_PLAYER_ONE");
                gameState.addCardToPlayer(card2, "TEST_PLAYER_ONE");
                gameState.addCardToPlayer(card3, "TEST_PLAYER_ONE");
                gameState.addCardToPlayer(card4, "TEST_PLAYER_ONE");
                const state = gameState.getGameState()
                expect(state.players[0].playerHandValue).toEqual(25)
            })
        })

        describe("addCardToDealer", () => {

            it("should remove 'card_back' card from dealer hand if third card is added, dealer hand lenght should be 2", () => {
                const card1 = new Card("X5", 5);
                const card2 = new Card("card_back", 0);
                const card3 = new Card("X5", 5);
                gameState.addCardToDealer(card1)
                gameState.addCardToDealer(card2)
                gameState.addCardToDealer(card3)
                const state = gameState.getGameState();
                expect(state.dealer.dealerHand.length).toBe(2);
            })

            it("should add a card of value of 10 to dealer, dealer should have a hand value of 10", () => {
                const card: Card = new Card("X10", 10);
                gameState.addCardToDealer(card);
                const state = gameState.getGameState();
                expect(state.dealer.dealerHandValue).toBe(10);
            })
            it("should return 'TEST' named card after adding it to TEST_PLAYER_ONE", () => {
                const card: Card = new Card("TEST", 0);
                gameState.addCardToDealer(card);
                const state = gameState.getGameState();
                expect(state.dealer.dealerHand[0].name).toBe("TEST");
            })

            it("ace should add 11 to dealer instead of 1 if hand value is 10 or under", () => {
                const card: Card = new Card("XA", 1);
                gameState.addCardToDealer(card)
                const state = gameState.getGameState()
                expect(state.dealer.dealerHandValue).toEqual(11)
            })


            it('ace should add 1 to dealer hand if handvalue is 11 or over', () => {
                const card1: Card = new Card("TEST", 11);
                const card2: Card = new Card("XA", 1);
                gameState.addCardToDealer(card1)
                gameState.addCardToDealer(card2)
                const state = gameState.getGameState()
                expect(state.dealer.dealerHandValue).toEqual(12)
            })

            it('dealer handvalue should be 12 if dealer gets two aces', () => {
                const card1: Card = new Card("XA", 1);
                const card2: Card = new Card("XA", 1);
                gameState.addCardToDealer(card1);
                gameState.addCardToDealer(card2);
                const state = gameState.getGameState()
                expect(state.dealer.dealerHandValue).toEqual(12)
            })

            it('should downgrade an ace from 11 to 1 value if dealer would go over 21 otherwise', () => {
                const card1: Card = new Card("X10", 10);
                const card2: Card = new Card("XA", 1);
                const card3: Card = new Card("X4", 4);
                gameState.addCardToDealer(card1);
                gameState.addCardToDealer(card2);
                gameState.addCardToDealer(card3);
                const state = gameState.getGameState()
                expect(state.dealer.dealerHandValue).toEqual(15)
            })

            it('should return 25 on double 7, then ace, then 10', () => {
                const card1: Card = new Card("X7", 7);
                const card2: Card = new Card("X7", 7);
                const card3: Card = new Card("XA", 1);
                const card4: Card = new Card("X10", 10);
                gameState.addCardToDealer(card1);
                gameState.addCardToDealer(card2);
                gameState.addCardToDealer(card3);
                gameState.addCardToDealer(card4);
                const state = gameState.getGameState()
                expect(state.dealer.dealerHandValue).toEqual(25)
            })

        })

    })

})



