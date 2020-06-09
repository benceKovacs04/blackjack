import IGameState from "./IGamestate";
import PlayerState from "./playerState.model";
import Card from "src/GameManager/UtilModels/Card.model";

export default class GameState implements IGameState {

    private players: Array<PlayerState> = new Array<PlayerState>()
    private dealer: { dealerHand: Array<Card>, dealerHandValue: number } = { dealerHand: Array<Card>(), dealerHandValue: 0 }
    private placedBets: number = 0;

    private calculateValueToAdd(cardValue: number, handValue: number, hand: Array<Card>) {
        let valueToAdd = cardValue;
        if (cardValue + handValue > 21 && hand.find(c => c.name[1] == 'A' && c.value === 11)) {
            const ace = hand.find(c => c.name[1] == 'A' && c.value === 11)
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


    addCardToPlayer(card: Card, playerName: string): void {
        const player = this.players.find(p => p.playerName === playerName)
        if (player.bet > 0) {
            const valueToAdd = this.calculateValueToAdd(card.value, player.playerHandValue, player.playerHand)
            card.value = valueToAdd
            player.playerHandValue += valueToAdd
            player.playerHand.push(card)
        }
    }

    addCardToDealer(card: Card) {
        if (this.dealer.dealerHand.length === 2) {
            this.dealer.dealerHand = this.dealer.dealerHand.filter(c => c.name !== "card_back")
        }
        const valueToAdd = this.calculateValueToAdd(card.value, this.dealer.dealerHandValue, this.dealer.dealerHand)
        this.dealer.dealerHand.push(card)
        this.dealer.dealerHandValue += valueToAdd
    }

    placeBet(playerName: string, amount: number) {
        this.players.find(p => p.playerName === playerName).bet = amount
        this.placedBets += 1
    }

    getNrOfBets(): number {
        return this.placedBets
    }

    getGameState(): { players: PlayerState[]; dealer: { dealerHand: Card[]; dealerHandValue: number; }; } {
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