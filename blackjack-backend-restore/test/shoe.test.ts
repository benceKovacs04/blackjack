import { TestingModule, Test } from "@nestjs/testing"
import Shoe from "../src/GameManager/deck/shoe";
import IShoe from "../src/GameManager/deck/IShoe";

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
})