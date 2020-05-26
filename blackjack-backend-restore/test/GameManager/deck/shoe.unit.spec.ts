import IShoe from '../../../src/GameManager/deck/IShoe'
import Shoe from "../../../src/GameManager/deck/shoe"


describe('Shoe', () => {
    let shoe: IShoe

    beforeEach(() => {
        shoe = new Shoe(6)
    })

    /* describe('getCard', () => {
         it('should return a string',  () => {
             expect(shoe.getCard()).toBeInstanceOf(String)
         })
     })*/

    describe('getCard', () => {
        it('should return a string of length between 2 and 3', () => {
            expect(shoe.getCard().length).toBeGreaterThanOrEqual(2)
            expect(shoe.getCard().length).toBeLessThanOrEqual(3)
        })
    })

    describe('getCardValue', () => {
        it('should return 1 for XA', () => {
            expect(shoe.getCardValue('XA')).toBe(1)
        })
    })

    describe('getCardValue', () => {
        it('should return 2 for X2', () => {
            expect(shoe.getCardValue('X2')).toBe(2)
        })
    })

    describe('getCardValue', () => {
        it('should return 5 for X5', () => {
            expect(shoe.getCardValue('X5')).toBe(5)
        })
    })

    describe('getCardValue', () => {
        it('should return 10 for XJ', () => {
            expect(shoe.getCardValue('XJ')).toBe(10)
        })
    })

    describe('getCardValue', () => {
        it('should return 10 for XK', () => {
            expect(shoe.getCardValue('XK')).toBe(10)
        })
    })
})