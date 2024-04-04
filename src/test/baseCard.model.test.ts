import { describe, expect, test } from "@jest/globals";
import { BaseCard } from "../model/baseCard.model";
import { Resources } from "../model/resources.model";

describe("baseCard tests", () => {
    const description = "description";
    const name = "name";

    class TestCard extends BaseCard {
        constructor() {
            super("name", "description", new Resources(1, 2, 3, 4));

            this.setDamage(1);
            this.setInitialLife(5);
        }
    }

    test("getters", () => {
        const card = new TestCard();

        card.getGeneration();

        expect(card.getDamage()).toBe(1);

        expect(card.getLife()).toBe(5);

        expect(card.getInitialLife()).toBe(5);

        expect(card.getPrice().isAllEqual(new Resources(1, 2, 3, 4)));

        expect(card.getDescription()).toBe(description);

        expect(card.getName()).toBe(name);
    });

    test("recive damage", () => {
        const card = new TestCard();

        card.reciveDamage(card.getDamage());

        expect(card.getLife()).toBe(4);

        expect(card.reciveDamage(6)).toBe(2);

        expect(card.getLife()).toBe(0);
    });

    test("can die", () => {
        const card = new TestCard();

        expect(card.getIsAlive()).toBeTruthy();

        card.reciveDamage(4);

        expect(card.getIsAlive()).toBeTruthy();

        card.reciveDamage(1);

        expect(card.getIsAlive()).toBeFalsy();
    });

    test("set generation", () => {
        class TryGenerateSouls extends BaseCard {
            constructor() {
                super(name, description, new Resources(0, 0, 0, 0));

                expect(
                    this.setGeneration(new Resources(1, 0, 0, 0))
                ).toBeFalsy();
                expect(
                    this.setGeneration(new Resources(0, 1, 1, 1))
                ).toBeTruthy();
            }
        }

        new TryGenerateSouls();
    });
});
