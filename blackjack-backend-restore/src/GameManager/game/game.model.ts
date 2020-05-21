import IPlayer from "../player/IPlayer";
import { Action } from "../player/player.model";
import IShoe from "../deck/IShoe";
import IGameState from "./gamestate/IGamestate";
import GameState from "./gamestate/gamestate.model"

export class Game {

    constructor(name: string, shoe: IShoe) {
        this.name = name;
        this.shoe = shoe
        this.phase = Phase.EmptyRoom
    }

    private name: string;
    private players: IPlayer[] = new Array<IPlayer>()
    private waitingRoom: IPlayer[] = []

    private activePlayer: IPlayer;

    private shoe: IShoe
    private usedCards: number = 0;

    private gameState: IGameState = new GameState();

    private phase: Phase

    getName(): string {
        return this.name;
    }

    getPlayerNum(): number {
        return this.players.length
    }

    addPlayer(player: IPlayer): boolean {
        if (this.players.length <= 3) {
            player.actionHandlers = this.actionHandlers
            player.initEvents()
            this.waitingRoom.push(player)
            this.gameState.addPlayerToState(player.username)
            if (this.players.length == 1) {
                this.phase = Phase.Betting
            }
            return true;
        }
        return false;
    }

    removePlayer(player: IPlayer): void {
        this.players.splice(this.players.indexOf(player), 1)
        this.gameState.removePlayerFromState(player.username)
        if (this.players.length === 0) {
            this.setPhase(Phase.EmptyRoom)
        }
    }

    /*nextPlayer() {
        this.activePlayer.endTurn()
        const activeIndex = this.players.indexOf(this.activePlayer)

        this.activePlayer = this.players[(activeIndex + 1) % this.players.length]

        this.activePlayer.setTurn()
    }*/

    private setPhase(phase: Phase) {
        this.phase = phase
        this.executePhase(phase)
    }

    addPlayersFromWaitingRoom() {
        this.waitingRoom.forEach(p => this.players.push(p))
        this.waitingRoom = []
    }

    handleBetting() {
        this.players.forEach(p => p.askForBet())
    }

    handleInitialHand() {
        const dealOneCard = () => {
            this.players.forEach(p => {
                const card = this.shoe.getCard()
                this.gameState.addCardToPlayer(card, this.shoe.getCardValue(card), p.username)
            })
        }
        dealOneCard()
        const dealerCard = this.shoe.getCard()
        this.gameState.addCardToDealer(dealerCard, this.shoe.getCardValue(dealerCard))
        let state = this.gameState.getGameState()
        this.players.forEach(p => p.sendGameState(state))

        setTimeout(() => {
            dealOneCard()
            this.gameState.addCardToDealer("card_back", 0)
            state = this.gameState.getGameState()
            this.players.forEach(p => {
                p.sendGameState(state)
            })
        }, 2000)
    }

    private executePhase(phase: Phase) {
        switch (phase) {
            case Phase.Betting:
                this.addPlayersFromWaitingRoom()
                this.handleBetting()
                break;
            case Phase.DealHands:
                this.handleInitialHand()
                break;

        }
    }



    //---- player action handlers ----

    /*private handleInitialDeal() {  
        for (let i = 0; i < 2; i++) {
            const card = this.shoe.getCard()
            this.gameState.addCardToPlayer(card, this.shoe.getCardValue(card))
        }

        this.gameState.addCardToDealer("card_back", 0)
        const dealerCard = this.shoe.getCard()
        this.gameState.addCardToDealer(dealerCard, this.shoe.getCardValue(dealerCard))

        this.activePlayer.sendGameState(this.gameState.getGameState())
        this.usedCards += 3;
    }*/

    /*private handleHit() {
        const card = this.shoe.getCard()
        this.gameState.addCardToPlayer(card, this.shoe.getCardValue(card))
        const state = this.gameState.getGameState()
        if (state.playerHandValue > 21) {
            state.over = true
            this.activePlayer.setAvailableCurrency(this.gameState.getBet() * -1)
        }
        this.activePlayer.sendGameState(state)
        this.usedCards++;
    }*/

    private placeBet(amount: number, playerName: string) {
        this.gameState.placeBet(playerName, amount)
        if (this.gameState.getNrOfBets() === this.players.length) {
            this.setPhase(Phase.DealHands)
        }
    }

    /*private handlePlayerAction(action: Action) {
        if ((this.shoe.getShoeSize() * 52) * 0.25 > this.usedCards) {
            this.shoe.resetShoe()
        }

        switch (action) {
            case Action.Deal:
                this.handleInitialDeal()
                break;
            case Action.Hit:
                this.handleHit()
                break;
            case Action.Stay:
                break;
            case Action.Tentative:
                this.nextPlayer()
        }
    }

    private actionHandlers = {
        bet: this.placeBet.bind(this),
        action: this.handlePlayerAction.bind(this)
    }*/
}

//---- end of player action handlers ----

enum Phase {
    Betting,
    DealHands,
    PlayerActions,
    DealDealer,
    Evaulate,
    EmptyRoom
}