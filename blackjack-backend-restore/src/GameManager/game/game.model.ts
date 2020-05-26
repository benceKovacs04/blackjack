import IPlayer from "../player/IPlayer";
import Player, { Action } from "../player/player.model";
import IShoe from "../deck/IShoe";
import IGameState from "./gamestate/IGamestate";
import { Brackets } from "typeorm";

export class Game {

    constructor(name: string, shoe: IShoe, gameState: IGameState) {
        this.name = name;
        this.shoe = shoe
        this.gameState = gameState
    }

    private name: string;
    private players: IPlayer[] = new Array<IPlayer>()
    private waitingRoom: IPlayer[] = []

    private gameState: IGameState;

    private activePlayer: IPlayer;

    private shoe: IShoe

    private phase: Phase

    private timer
    private timerCounter: number

    getName(): string {
        return this.name;
    }

    getPlayerNum(): number {
        return this.players.length + this.waitingRoom.length
    }

    addPlayer(player: IPlayer): boolean {
        if (this.players.length + this.waitingRoom.length < 3) {
            player.actionHandlers = this.actionHandlers
            player.initEvents()
            if (this.phase === Phase.Betting && this.timerCounter > 3) {
                this.players.push(player)
                player.setBettingPhaseOnPlayer(this.timerCounter)
            } else {
                this.waitingRoom.push(player)
            }
            this.gameState.addPlayerToState(player.username)
            if (this.players.length === 0 && this.waitingRoom.length === 1) {
                this.setPhase(Phase.Betting)
            }
            return true;
        }
        return false;
    }

    removePlayer(player: IPlayer): void {
        this.players.splice(this.players.indexOf(player), 1)
        this.waitingRoom.splice(this.waitingRoom.indexOf(player), 1)
        this.gameState.removePlayerFromState(player.username)
        if (this.players.length === 0) {
            this.setPhase(Phase.EmptyRoom)
        }
    }

    nextPlayer() {
        this.activePlayer.endTurn()
        clearTimeout(this.timer)
        const activeIndex = this.players.indexOf(this.activePlayer)
        if (activeIndex + 1 === this.players.length) {
            this.setPhase(Phase.DealDealer)
            this.activePlayer.endTurn()
            this.activePlayer = null;
            return
        }

        this.activePlayer = this.players[activeIndex + 1]
        this.timer = setTimeout(() => this.nextPlayer(), 10000)
        this.activePlayer.setTurn()
    }

    //---- Game phase handlers ----

    private setPhase(phase: Phase) {
        this.phase = phase
        this.executePhase(phase)
    }

    private addPlayersFromWaitingRoom() {
        this.waitingRoom.forEach(p => this.players.push(p))
        this.waitingRoom = []
    }

    private handleBetting() {
        this.players.forEach(p => p.setBettingPhaseOnPlayer(10))
        this.startBettingTimer()
    }

    private startBettingTimer() {
        this.timerCounter = 10
        this.timer = setInterval(() => {
            this.timerCounter -= 1
            if (this.timerCounter === 0) {
                clearInterval(this.timer)
                this.setPhase(Phase.DealHands)
            }
        }, 1000)
    }

    private handleInitialHand() {
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
        }, 1000)
        setTimeout(() => this.setPhase(Phase.PlayerDecisions), 3000)
    }

    initPlayerDecisionPhase() {
        this.activePlayer = this.players[0]
        this.activePlayer.setTurn()
        this.timer = setTimeout(() => this.nextPlayer(), 10000)
    }

    handleDealerHand() {
        this.timer = setInterval(() => {
            let card = this.shoe.getCard()
            this.gameState.addCardToDealer(card, this.shoe.getCardValue(card))
            let state = this.gameState.getGameState()
            this.players.forEach(p => p.sendGameState(state))

            if (state.dealer.dealerHandValue > 16) {
                clearInterval(this.timer)
                this.setPhase(Phase.Evaulate)
            }
        }, 1000)
    }


    private executePhase(phase: Phase) {
        switch (phase) {
            case Phase.Betting:
                this.addPlayersFromWaitingRoom()
                this.handleBetting()
                break;
            case Phase.DealHands:
                this.players.forEach(p => p.setBettingPhaseOnPlayer(0))
                setTimeout(() => this.handleInitialHand(), 2000)
                break;
            case Phase.PlayerDecisions:
                this.initPlayerDecisionPhase()
                break;
            case Phase.DealDealer:
                this.handleDealerHand()
                break;
            case Phase.EmptyRoom:
                clearInterval(this.timer)
                clearTimeout(this.timer)
                this.gameState.resetState()
                this.activePlayer = null;


        }
    }

    //---- End Game phase handlers ----



    //---- player action handlers ----

    private placeBet(amount: number, playerName: string) {
        this.gameState.placeBet(playerName, amount)
        if (this.gameState.getNrOfBets() === this.players.length) {
            clearInterval(this.timer)
            this.setPhase(Phase.DealHands)
        }
    }

    private handleHit() {
        const card = this.shoe.getCard()
        this.gameState.addCardToPlayer(card, this.shoe.getCardValue(card), this.activePlayer.username)
        const state = this.gameState.getGameState()
        this.players.forEach(p => p.sendGameState(state))

        if (state.players.find(p => p.playerName === this.activePlayer.username).playerHandValue > 21) {
            this.nextPlayer()
        } else {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => this.nextPlayer(), 10000)
        }
    }

    private handlePlayerAction(action: Action, username: string) {

        if (username !== this.activePlayer.username) return

        switch (action) {
            case Action.Stay:
                this.nextPlayer()
                break;
            case Action.Hit:
                this.handleHit()
                break;
        }
    }

    private actionHandlers = {
        bet: this.placeBet.bind(this),
        action: this.handlePlayerAction.bind(this)
    }
}

//---- end of player action handlers ----

enum Phase {
    Betting,
    DealHands,
    PlayerDecisions,
    DealDealer,
    Evaulate,
    EmptyRoom
}