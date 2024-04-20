import { describe, expect, test } from "@jest/globals";
import { BaseCard } from "../model/baseCard.model";
import { Resources } from "../model/resources.model";
import { LostSoulCard } from "../model/cards/lostSoulCard.model";
import { RatCard } from "../model/cards/ratCard.model";

describe("baseCard tests", () => {
    test("getters", () => {
        const rat = new RatCard();

        rat.getGeneration();

        expect(rat.getDamage()).toBe(1);

        expect(rat.getLife()).toBe(2);

        expect(rat.getInitialLife()).toBe(2);

        expect(rat.getPrice().isAllEqual(new Resources(1, 0, 0, 1)));

        expect(rat.getName()).toBe("rat");
    });

    test("recive damage", () => {
        const rat1 = new RatCard();

        expect(rat1.getLife()).toBe(2);

        expect(rat1.reciveDamage(4)).toBe(2);

        expect(rat1.getLife()).toBe(0);
    });

    test("can die", () => {
        const rat = new RatCard();

        expect(rat.getIsAlive()).toBeTruthy();

        rat.reciveDamage(1);

        expect(rat.getIsAlive()).toBeTruthy();

        rat.reciveDamage(1);

        expect(rat.getIsAlive()).toBeFalsy();
    });

    test("set generation", () => {
        class TryGenerateSouls extends BaseCard {
            protected name: string = "";
            protected damage: number = 0;
            protected price: Resources = new Resources(0, 0, 0, 0);
            protected description: string = "";
            constructor() {
                super();

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
