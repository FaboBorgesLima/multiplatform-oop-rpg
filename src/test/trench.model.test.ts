import { describe, expect, test } from "@jest/globals";
import { Trench } from "../model/trench.model";
import { RatCard } from "../model/cards/ratCard.model";
import { ButcherCard } from "../model/cards/butcherCard.model";

describe("trench tests", () => {
    test("insertCard", () => {
        const trench = new Trench();

        // insert in wrong place
        expect(trench.insertCard(new RatCard(), trench.N_ROWS, 0)).toBeFalsy();

        expect(trench.insertCard(new RatCard(), 0, trench.N_COLS)).toBeFalsy();

        expect(trench.insertCard(new RatCard(), -1, 0)).toBeFalsy();

        expect(trench.insertCard(new RatCard(), 0, -1)).toBeFalsy();

        // insert in right place
        expect(trench.insertCard(new RatCard(), 0, 0)).toBeTruthy();

        expect(
            trench.insertCard(
                new RatCard(),
                trench.N_ROWS - 1,
                trench.N_COLS - 1
            )
        ).toBeTruthy();

        // insert in same place

        expect(trench.insertCard(new RatCard(), 0, 0)).toBeFalsy();

        expect(
            trench.insertCard(
                new RatCard(),
                trench.N_ROWS - 1,
                trench.N_COLS - 1
            )
        ).toBeFalsy();
    });

    test("hasAliveCards", () => {
        const trench = new Trench();

        //brand new trench
        expect(trench.hasAliveCard()).toBeFalsy();

        //insert card
        trench.insertCard(new RatCard(), 0, 0);

        expect(trench.hasAliveCard()).toBeTruthy();
    });

    test("attack", () => {
        const trench = new Trench();

        // brand new attack
        expect(trench.attack()).toEqual([0, 0, 0, 0]);
        // insert rat card
        trench.insertCard(new RatCard(), 1, 0);

        expect(trench.attack()).toEqual([1, 0, 0, 0]);
        // insert two rat card in same col
        trench.insertCard(new RatCard(), 0, 0);

        expect(trench.attack()).toEqual([1, 0, 0, 0]);
        // insert rat card and then ...
        trench.insertCard(new RatCard(), 1, 1);
        expect(trench.attack()).toEqual([1, 1, 0, 0]);
        // insert a butcher
        trench.insertCard(new ButcherCard(), 0, 1);
        expect(trench.attack()).toEqual([1, 0, 0, 0]);
    });

    test("reciveAttack", () => {
        const trench = new Trench();

        expect(trench.reciveAttack([1, 2, 4, 8])).toEqual([15, 0]);

        trench.insertCard(new RatCard(), 0, 0);

        expect(trench.reciveAttack([2, 0, 0, 0])).toEqual([0, 1]);

        trench.insertCard(new RatCard(), 0, 0);

        expect(trench.reciveAttack([3, 0, 0, 0])).toEqual([1, 1]);
    });

    test("reciveAttack and attack", () => {
        const trench = new Trench();

        trench.insertCard(new RatCard(), 0, 0);

        expect(trench.attack()).toEqual([1, 0, 0, 0]);

        expect(trench.reciveAttack([3, 0, 0, 0])).toEqual([1, 1]);

        expect(trench.attack()).toEqual([0, 0, 0, 0]);
    });
});
