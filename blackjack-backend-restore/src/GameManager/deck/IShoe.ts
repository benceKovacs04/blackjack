export default interface IShoe {
    getCard(): string
    getCardValue(card: string): number
    resetShoe(): void
    getShoeSize(): number
}