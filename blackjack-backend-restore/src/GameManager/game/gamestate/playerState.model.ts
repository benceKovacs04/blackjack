export default class PlayerState {
    playerName: string
    playerHand: Array<{ card: string, value: number }> = new Array<{ card: string, value: number }>()
    playerHandValue: number = 0
    bet: number = 0
}