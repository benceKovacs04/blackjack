import IPlayer from "../player/IPlayer";
import IGame from "./IGame.interface"
import { Action } from "../player/player.model";
import IShoe from "../deck/IShoe";
import IGameState from "./gamestate/IGamestate";
import Card from "../UtilModels/Card.model";

export class Game implements IGame {

    constructor(name: string, owner: string, shoe: IShoe, gameState: IGameState) {
        this.name = name;
        this.shoe = shoe
        this.gameState = gameState
        this.phase = Phase.EmptyRoom
        this.owner = owner;
    }

    private name: string;
    private owner: string;
    private players: IPlayer[] = new Array<IPlayer>()
    private waitingRoom: IPlayer[] = []

    private gameState: IGameState;

    private activePlayer: IPlayer;

    private shoe: IShoe

    private phase: Phase

    private intervalIDs = []
    private timeoutIDs = []

    private timerCounter: number

    //----- IGame interface methods ----

    getName(): string {
        return this.name;
    }

    getOwner(): string {
        return this.owner;
    }

    getPlayerNum(): number {
        return this.players.length + this.waitingRoom.length
    }

    sendGameStateToPlayers() {
        const state = this.gameState.getGameState();
        this.players.forEach(p => p.sendGameState(state));
        this.waitingRoom.forEach(p => p.sendGameState(state));
    }

    addPlayer(player: IPlayer): boolean {
        if (this.players.length + this.waitingRoom.length < 3) {
            player.actionHandlers = this.actionHandlers
            player.initEvents()

            if (this.phase === Phase.EmptyRoom) {
                this.players.push(player)
                this.setPhase(Phase.Betting)
            } else if (this.phase === Phase.Betting && this.timerCounter > 3) {
                this.players.push(player)
                player.setBettingPhaseOnPlayer(this.timerCounter)
            } else {
                this.waitingRoom.push(player)
            }
            this.gameState.addPlayerToState(player.username)

            this.sendGameStateToPlayers();
            return true;
        }
        return false;
    }

    removePlayer(player: IPlayer): void {
        this.players.splice(this.players.indexOf(player), 1);
        this.waitingRoom.splice(this.waitingRoom.indexOf(player), 1);
        this.gameState.removePlayerFromState(player.username);
        this.sendGameStateToPlayers();
        if (this.activePlayer === player) {
            this.nextPlayer();
        }
        if (this.players.length === 0 && this.waitingRoom.length === 0) {
            this.setPhase(Phase.EmptyRoom);
        }
    }

    //----- End of IGame interface methods ----

    private killTimers() {
        this.intervalIDs.forEach(i => clearInterval(i));
        this.timeoutIDs.forEach(t => clearTimeout(t));
        this.intervalIDs = [];
        this.timeoutIDs = [];
    }

    private nextPlayer() {
        this.activePlayer.endTurn();
        this.killTimers();
        let possibleNextIndex = this.players.indexOf(this.activePlayer) + 1;

        while (true) {
            if (possibleNextIndex === this.players.length) {
                this.setPhase(Phase.DealDealer)
                this.activePlayer = null;
                return
            }
            if (this.gameState.getGameState().players.find(p => p.playerName === this.players[possibleNextIndex].username).bet > 0) {
                this.activePlayer = this.players[possibleNextIndex];
                this.timeoutIDs.push(setTimeout(() => this.nextPlayer(), 10000));
                this.activePlayer.setTurn();
                return;
            }
            possibleNextIndex++;
        }
    }

    //---- Game phase handlers ----

    private setPhase(phase: Phase) {
        if (phase === Phase.DealHands) {
            if (this.gameState.getGameState().players.reduce((a, b) => a + b.bet, 0) === 0) {
                setTimeout(() => {
                    this.phase = Phase.Betting;
                    this.executePhase(this.phase);
                }, 1000);
                return;
            }
        }
        this.phase = phase
        this.executePhase(phase)
    }

    private addPlayersFromWaitingRoom() {
        this.waitingRoom.forEach(p => this.players.push(p))
        this.waitingRoom = []
    }

    private handleBetting() {
        this.sendGameStateToPlayers()
        this.players.forEach(p => p.setBettingPhaseOnPlayer(10))
        this.startBettingTimer()
    }

    private startBettingTimer() {
        this.timerCounter = 10
        this.intervalIDs.push(setInterval(() => {
            this.timerCounter -= 1
            this.players.forEach(p => p.sendTimer(this.timerCounter))
            if (this.timerCounter === 0) {
                this.killTimers()
                if (this.players.length > 0) {
                    this.setPhase(Phase.DealHands)
                }
            }
        }, 1000))
    }

    private handleInitialHand() {
        const dealOneCard = () => {
            this.players.forEach(p => {
                const card = this.shoe.getCard()
                this.gameState.addCardToPlayer(card, p.username)
            })
        }
        dealOneCard()
        const dealerCard = this.shoe.getCard()
        this.gameState.addCardToDealer(dealerCard)
        this.sendGameStateToPlayers()

        this.timeoutIDs.push(setTimeout(() => {
            dealOneCard();
            this.gameState.addCardToDealer(new Card("card_back", 0));
            this.sendGameStateToPlayers();
        }, 1000))
        this.timeoutIDs.push(setTimeout(() => this.setPhase(Phase.PlayerDecisions), 3000));
    }

    private initPlayerDecisionPhase() {
        if (this.players.length > 0) {
            for (let i = 0; i < this.players.length; i++) {
                if (this.gameState.getGameState().players.find(p => p.playerName === this.players[i].username).bet > 0) {
                    this.activePlayer = this.players[i];
                    this.activePlayer.setTurn();
                    break;
                }
            }
            this.timeoutIDs.push(setTimeout(() => this.nextPlayer(), 10000))
        }
    }

    private handleDealerHand() {
        this.intervalIDs.push(setInterval(() => {
            let card = this.shoe.getCard()
            this.gameState.addCardToDealer(card)
            let state = this.gameState.getGameState()
            this.sendGameStateToPlayers();

            if (state.dealer.dealerHandValue > 16) {
                this.killTimers()
                this.setPhase(Phase.Evaulate)
            }
        }, 1000))
    }

    private handleEvaulate() {
        const state = this.gameState.getGameState()
        this.players.forEach(p => {
            let playerState = state.players.find(ps => ps.playerName === p.username)
            if (state.dealer.dealerHandValue > 21) {
                if (playerState.playerHandValue <= 21) {
                    p.setAvailableCurrency(playerState.bet * 2)
                    p.sendRoundResult("Win")
                }
            } else {
                if (playerState.playerHandValue > state.dealer.dealerHandValue && playerState.playerHandValue <= 21) {
                    p.setAvailableCurrency(playerState.bet * 2)
                    p.sendRoundResult("Win")
                } else if (playerState.playerHandValue === state.dealer.dealerHandValue) {
                    p.setAvailableCurrency(playerState.bet)
                    p.sendRoundResult("Push")
                } else {
                    p.sendRoundResult("Lose")
                }

            }
        })
        this.gameState.resetState()
        this.timeoutIDs.push(setTimeout(() => this.setPhase(Phase.Betting), 2000))
    }

    private executePhase(phase: Phase) {
        switch (phase) {
            case Phase.Betting:
                this.addPlayersFromWaitingRoom()
                this.handleBetting()
                break;
            case Phase.DealHands:
                this.players.forEach(p => p.setBettingPhaseOnPlayer(0))
                this.timeoutIDs.push(setTimeout(() => this.handleInitialHand(), 2000))
                break;
            case Phase.PlayerDecisions:
                this.initPlayerDecisionPhase()
                break;
            case Phase.DealDealer:
                this.handleDealerHand()
                break;
            case Phase.Evaulate:
                this.handleEvaulate()
                break;
            case Phase.EmptyRoom:
                this.killTimers()
                this.gameState.resetState()
                this.activePlayer = null;
        }
    }

    //---- End Game phase handlers ----



    //---- player action handlers ----

    private placeBet(bet: { amount: number, username: string }) {
        this.gameState.placeBet(bet.username, bet.amount)
        if (this.gameState.getNrOfBets() === this.players.length) {
            this.killTimers()
            this.setPhase(Phase.DealHands)
        }
    }

    private handleHit() {
        const card = this.shoe.getCard()
        this.gameState.addCardToPlayer(card, this.activePlayer.username)
        const state = this.gameState.getGameState()
        this.players.forEach(p => p.sendGameState(state))

        if (state.players.find(p => p.playerName === this.activePlayer.username).playerHandValue >= 21) {
            this.nextPlayer()
        } else {
            this.killTimers()
            this.timeoutIDs.push(setTimeout(() => this.nextPlayer(), 10000))
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