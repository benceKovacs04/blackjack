import IShoe from '../../../src/GameManager/deck/IShoe'
import Shoe from "../../../src/GameManager/deck/shoe"


describe('Shoe', () => {
    let shoe: IShoe

    beforeEach(() => {
        shoe = new Shoe(6)
    })

    /* describe('getCard', () => {
         it('should return a string', async () => {
             expect(shoe.getCard()).toBeInstanceOf(String)
         })
     })*/

    describe('getCard', () => {
        it('should return a string of length 2', async () => {
            expect(shoe.getCard().length).toBe(2)
        })
    })

    describe('getCardValue', () => {
        it('should return 1 for XA', async () => {
            expect(shoe.getCardValue('XA')).toBe(1)
        })
    })

    describe('getCardValue', () => {
        it('should return 2 for X2', async () => {
            expect(shoe.getCardValue('X2')).toBe(2)
        })
    })

    describe('getCardValue', () => {
        it('should return 5 for X5', async () => {
            expect(shoe.getCardValue('X5')).toBe(5)
        })
    })

    describe('getCardValue', () => {
        it('should return 10 for XJ', async () => {
            expect(shoe.getCardValue('XJ')).toBe(10)
        })
    })

    describe('getCardValue', () => {
        it('should return 10 for XK', async () => {
            expect(shoe.getCardValue('XK')).toBe(10)
        })
    })
})