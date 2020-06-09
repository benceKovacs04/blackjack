export default interface IShoe {
    getCard(): { card: string, value: number }
    resetShoe(): void
    getShoeSize(): number
}