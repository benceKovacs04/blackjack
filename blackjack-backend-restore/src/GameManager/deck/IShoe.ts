import Card from "../UtilModels/Card.model";

export default interface IShoe {
    getCard(): Card;
    resetShoe(): void;
    getShoeSize(): number;
}