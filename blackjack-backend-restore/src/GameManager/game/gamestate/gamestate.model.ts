import IGameState from "./IGamestate";
import PlayerState from "./playerState.model";

export default class GameState implements IGameState {

    private players: Array<PlayerState> = new Array<PlayerState>()
    private dealer: { dealerHand: Array<{ card: string, value: number }>, dealerHandValue: number } = { dealerHand: [], dealerHandValue: 0 }
    private placedBets: number = 0;

    private calculateValueToAdd(cardValue: number, handValue: number, hand: Array<{ card: string, value: number }>) {
        let valueToAdd = cardValue;
        if (cardValue + handValue > 21 && hand.find(c => c.card[1] == 'A' && c.value === 11)) {
            const ace = hand.find(c => c.card[1] == 'A' && c.value === 11)
            ace.value = 1;
        }
        if (cardValue === 1 && handValue <= 10) {
            valueToAdd = 11
        }
        return valueToAdd
    }

    addPlayerToState(name: string): boolean {
        if (this.players.length < 3) {
            const playerState = new PlayerState()
            playerState.playerName = name
            this.players.push(playerState)
            return true
        }
        return false
    }

    removePlayerFromState(name: string) {
        this.players = this.players.filter(p => p.playerName !== name)
    }


    addCardToPlayer(card: string, value: number, playerName: string): void {
        const player = this.players.find(p => p.playerName === playerName)
        if (player.bet > 0) {
            const valueToAdd = this.calculateValueToAdd(value, player.playerHandValue, player.playerHand)
            player.playerHandValue += valueToAdd
            player.playerHand.push({ card: card, value: valueToAdd })
        }
    }

    addCardToDealer(card: string, value: number) {
        if (this.dealer.dealerHand.length === 2) {
            this.dealer.dealerHand = this.dealer.dealerHand.filter(c => c.card !== "card_back")
        }
        const valueToAdd = this.calculateValueToAdd(value, this.dealer.dealerHandValue, this.dealer.dealerHand)
        this.dealer.dealerHand.push({ card, value })
        this.dealer.dealerHandValue += valueToAdd
    }

    placeBet(playerName: string, amount: number) {
        this.players.find(p => p.playerName === playerName).bet = amount
        this.placedBets += 1
    }

    getNrOfBets(): number {
        return this.placedBets
    }

    getGameState(): { players: PlayerState[]; dealer: { dealerHand: { card: string; value: number; }[]; dealerHandValue: number; }; } {
        return { players: [...this.players], dealer: { dealerHand: [...this.dealer.dealerHand], dealerHandValue: this.dealer.dealerHandValue } }
    }

    resetState() {
        this.players.forEach(p => {
            p.playerHand = []
            p.playerHandValue = 0
            p.bet = 0
        })

        this.dealer.dealerHand = []
        this.dealer.dealerHandValue = 0
        this.placedBets = 0
    }




































}