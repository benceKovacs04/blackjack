import IPlayer from "../player/IPlayer";
import { Action } from "../player/player.model";
import IShoe from "../deck/IShoe";
import IGameState from "./IGamestate";
import GameState from "./gamestate.model"

export class Game {

    constructor(name: string, shoe: IShoe) {
        this.name = name;
        this.shoe = shoe
    }

    private name: string;
    private players: IPlayer[] = new Array<IPlayer>()

    private activePlayer: IPlayer;

    private shoe: IShoe
    private usedCards: number = 0;

    private gameState: IGameState = new GameState();

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
            this.players.push(player)
            if (this.players.length == 1) {
                this.activePlayer = player
                this.activePlayer.setTurn()
            }
            return true;
        }
        return false;
    }

    removePlayer(player: IPlayer): void {
        if (this.players.length === 1) {
            this.activePlayer = null
            this.gameState.resetGameState()
        }
        if (player === this.activePlayer) {
            this.nextPlayer();
        }
        this.players.splice(this.players.indexOf(player), 1)
        if (this.players.length === 0) {
        }
    }

    nextPlayer() {
        this.activePlayer.endTurn()
        this.gameState.resetGameState()
        const activeIndex = this.players.indexOf(this.activePlayer)

        this.activePlayer = this.players[(activeIndex + 1) % this.players.length]

        this.activePlayer.setTurn()
    }

    handleInitialDeal() {
        for (let i = 0; i < 2; i++) {
            const card = this.shoe.getCard()
            this.gameState.addCardToPlayer(card, this.shoe.getCardValue(card))
        }

        this.gameState.addCardToDealer("card_back", 0)
        const dealerCard = this.shoe.getCard()
        this.gameState.addCardToDealer(dealerCard, this.shoe.getCardValue(dealerCard))

        this.activePlayer.sendGameState(this.gameState.getGameState())
        this.usedCards += 3;
    }

    handleHit() {
        const card = this.shoe.getCard()
        this.gameState.addCardToPlayer(card, this.shoe.getCardValue(card))
        const state = this.gameState.getGameState()
        if (state.playerHandValue > 21) {
            state.over = true
            this.activePlayer.setAvailableCurrency(this.gameState.getBet() * -1)
        }
        this.activePlayer.sendGameState(state)
        this.usedCards++;
    }

    placeBet(amount: number) {
        this.gameState.placeBet(amount)
        this.handlePlayerAction(Action.Deal)
    }

    handlePlayerAction(action: Action) {
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

    actionHandlers = {
        bet: this.placeBet.bind(this),
        action: this.handlePlayerAction.bind(this)
    }
}