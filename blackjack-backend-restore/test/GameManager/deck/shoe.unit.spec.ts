import IShoe from '../../../src/GameManager/deck/IShoe'
import Shoe from "../../../src/GameManager/deck/shoe"
import Card from '../../../src/GameManager/UtilModels/Card.model'


describe('Shoe', () => {
    let shoe: IShoe

    beforeEach(() => {
        shoe = new Shoe(6)
    })


    describe('getCard', () => {
        it('should return a Card with a name and a value', () => {
            const card: Card = shoe.getCard();
            expect(card.name).not.toBeUndefined()
            expect(card.value).not.toBeUndefined();
        })

        it("card should have a name equal or shorter than 3 chars", () => {
            const card: Card = shoe.getCard();
            expect(card.name.length).toBeLessThanOrEqual(3);
        })

        it("card should have a value of equal or lower than 10", () => {
            const card: Card = shoe.getCard();
            expect(card.value).toBeLessThanOrEqual(10);
        })

    })
})