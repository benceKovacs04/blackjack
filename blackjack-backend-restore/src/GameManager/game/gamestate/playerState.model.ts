import Card from "src/GameManager/UtilModels/Card.model"

export default class PlayerState {
    playerName: string
    playerHand: Array<Card> = new Array<Card>()
    playerHandValue: number = 0
    bet: number = 0
}