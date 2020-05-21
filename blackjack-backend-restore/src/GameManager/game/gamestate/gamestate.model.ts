import IGameState from "./IGamestate";
import PlayerState from "./playerState.model";

export default class GameState implements IGameState {

    /*private playerHand: Array<{ card: string, value: number }> = new Array<{ card: string, value: number }>()
    private playerHandValue: number = 0
    private dealerHand: Array<{ card: string, value: number }> = new Array<{ card: string, value: number }>()
    private dealerHandValue: number = 0
    private bet: number = 0;

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

    addCardToPlayer(cardName: string, cardValue: number): void {
        const valueToAdd = this.calculateValueToAdd(cardValue, this.playerHandValue, this.playerHand)
        this.playerHand.push({ card: cardName, value: valueToAdd })
        this.playerHandValue = this.playerHand.map(c => c.value).reduce((a, b) => a + b, 0)
    }

    addCardToDealer(cardName: string, cardValue: number): void {
        const valueToAdd = this.calculateValueToAdd(cardValue, this.dealerHandValue, this.dealerHand)
        this.dealerHand.push({ card: cardName, value: valueToAdd })
        this.dealerHandValue = this.dealerHand.map(c => c.value).reduce((a, b) => a + b, 0)
    }

    getGameState(): { playerHand: string[]; playerHandValue: number; dealerHand: string[]; dealerHandValue: number; over: boolean } {
        const playerCards = this.playerHand.map(c => c.card)
        const dealerCards = this.dealerHand.map(c => c.card)
        return { playerHand: playerCards, playerHandValue: this.playerHandValue, dealerHand: dealerCards, dealerHandValue: this.dealerHandValue, over: false }
    }

    resetGameState(): void {
        this.playerHand = new Array<{ card: string, value: number }>()
        this.playerHandValue = 0
        this.dealerHand = new Array<{ card: string, value: number }>()
        this.dealerHandValue = 0
    }

    placeBet(amount: number): void {
        this.bet = amount
    }

    getBet(): number {
        return this.bet
    }*/




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
        this.players.filter(p => p.playerName !== name)
    }


    addCardToPlayer(card: string, value: number, playerName: string): void {
        const player = this.players.find(p => p.playerName === playerName)
        const valueToAdd = this.calculateValueToAdd(value, player.playerHandValue, player.playerHand)
        player.playerHandValue += valueToAdd
        player.playerHand.push({ card: card, value: valueToAdd })
    }

    addCardToDealer(card: string, value: number) {
        const valueToAdd = this.calculateValueToAdd(value, this.dealer.dealerHandValue, this.dealer.dealerHand)
        this.dealer.dealerHand.push({ card, value })
        this.dealer.dealerHandValue += valueToAdd
    }

    placeBet(playerName: string, amount: number) {
        this.players.find(p => p.playerName === playerName).bet = amount
        this.placedBets++
    }

    getNrOfBets(): number {
        return this.placedBets
    }

    getGameState(): { players: PlayerState[]; dealer: { dealerHand: { card: string; value: number; }[]; dealerHandValue: number; }; } {
        return { players: this.players, dealer: this.dealer }
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