import { describe, expect, test } from "@jest/globals";
import { Resources } from "../model/resources.model";

describe("resources tests", () => {
    test("getters", () => {
        const res = new Resources(1, 2, 3, 4);

        expect(res.getSouls()).toBe(1);

        expect(res.getBlood()).toBe(2);

        expect(res.getBones()).toBe(3);

        expect(res.getMeat()).toBe(4);
    });
    test("is all equal", () => {
        const res = new Resources(1, 2, 3, 4);
        const resEqual = new Resources(1, 2, 3, 4);
        const resDifferent1 = new Resources(0, 2, 3, 4);
        const resDifferent2 = new Resources(1, 0, 3, 4);
        const resDifferent3 = new Resources(1, 2, 0, 4);
        const resDifferent4 = new Resources(1, 2, 3, 0);

        expect(res.isAllEqual(resEqual)).toBe(true);

        expect(res.isAllEqual(resDifferent1)).toBe(false);

        expect(res.isAllEqual(resDifferent2)).toBe(false);

        expect(res.isAllEqual(resDifferent3)).toBe(false);

        expect(res.isAllEqual(resDifferent4)).toBe(false);
    });

    test("is all smaller", () => {
        const res = new Resources(1, 2, 3, 4);
        const resEqual = new Resources(1, 2, 3, 4);
        const resSmallerAll = new Resources(0, 1, 2, 3);
        const resSmallerOne = new Resources(1, 2, 3, 3);
        const resBigger = new Resources(2, 3, 4, 5);

        expect(res.isAllSmaller(resEqual)).toBeFalsy();

        expect(resSmallerAll.isAllSmaller(res)).toBeTruthy();

        expect(resSmallerOne.isAllSmaller(res)).toBeFalsy();

        expect(res.isAllSmaller(resBigger)).toBeTruthy();
    });

    test("sum", () => {
        let res = new Resources(0, 0, 0, 0);
        const res1234 = new Resources(1, 2, 3, 4);
        const res1234minus = new Resources(-1, -2, -3, -4);
        const res0 = new Resources(0, 0, 0, 0);

        res = Resources.add(res, res);

        expect(res.isAllEqual(res)).toBeTruthy();

        res = Resources.add(res, res1234);
        res = Resources.add(res, res0);

        expect(res.isAllEqual(res1234)).toBeTruthy();

        res = Resources.add(res, res1234);

        expect(res.isAllEqual(new Resources(2, 4, 6, 8))).toBeTruthy();

        res = Resources.add(res0, res1234minus);

        expect(res.isAllEqual(res1234minus)).toBeTruthy();
    });

    test("subtraction", () => {
        let res = new Resources(0, 0, 0, 0);
        const res1234 = new Resources(1, 2, 3, 4);
        const res1234minus = new Resources(-1, -2, -3, -4);
        const res0 = new Resources(0, 0, 0, 0);

        res = Resources.subtract(res, res0);

        expect(res.isAllEqual(res)).toBeTruthy();

        expect(
            Resources.subtract(res0, res1234).isAllEqual(res1234minus)
        ).toBeTruthy();

        expect(
            Resources.subtract(res0, res1234minus).isAllEqual(res1234)
        ).toBeTruthy();

        expect(
            Resources.subtract(res1234, res1234minus).isAllEqual(
                new Resources(2, 4, 6, 8)
            )
        ).toBeTruthy();
    });

    test("clear", () => {
        const res = new Resources(1, 2, 3, 4);
        const res1234 = new Resources(1, 2, 3, 4);
        const res0 = new Resources(0, 0, 0, 0);

        expect(res.isAllEqual(res1234)).toBeTruthy();

        res.clear();

        expect(res.isAllEqual(res0)).toBeTruthy();
    });
});
