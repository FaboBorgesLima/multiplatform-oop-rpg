import { Action, ActionsT } from "./action.model";
import { AirElement } from "./airElement.model";
import { EarthElement } from "./earthElement.model";
import { Effect } from "./effect.model";
import { Entity } from "./entity.interface";
import { FireElement } from "./fireElement.model";
import { NatureElement } from "./natureElement.model";
import { WaterElement } from "./waterElement.model";

export class Mob implements Entity {
    private readonly MAX_DEFENSE_LEVEL = 10;

    private damageLevel: number = 0;
    private defenseLevel: number = 0;
    private maxLifeLevel: number = 0;
    private natureElements: NatureElement[] = [];
    private life: number = 100;
    private level: number = 0;

    constructor(level: number) {
        this.setLevel(level);

        this.randomUpLevels();

        this.natureElements.push(this.generateRandomNatureElement());
    }

    applyEffect(effect: Effect): void {
        this.life -= effect.getDamage();
    }

    protected setLevel(level: number): void {
        this.level = Math.abs(Math.trunc(level));
    }

    protected randomUpLevels(): void {
        while (this.getSpentLevels() < this.level) {
            const random0to2 = this.generateRandomInt(2);

            switch (random0to2) {
                case 0:
                    this.upDamage();
                    break;
                case 1:
                    this.upDefense();
                    break;
                case 2:
                    this.upMaxLife();
                    break;
            }
        }
    }

    protected generateRandomNatureElement(): NatureElement {
        const random0to3 = Math.trunc(this.generateRandomInt(3));

        switch (random0to3) {
            case 0:
                return new WaterElement(this);
            case 1:
                return new FireElement(this);
            case 2:
                return new AirElement(this);
        }
        return new EarthElement(this);
    }

    protected upDefense(): boolean {
        if (
            this.getSpentLevels() < this.level &&
            this.defenseLevel < this.MAX_DEFENSE_LEVEL
        ) {
            this.defenseLevel++;
            return true;
        }

        return false;
    }

    protected upDamage(): boolean {
        if (this.getSpentLevels() < this.level) {
            this.damageLevel++;
            return true;
        }

        return false;
    }

    protected upMaxLife(): boolean {
        if (this.getSpentLevels() < this.level) {
            this.maxLifeLevel++;
            this.life = this.getMaxLife();
            return true;
        }

        return false;
    }

    protected getSpentLevels(): number {
        return this.damageLevel + this.defenseLevel + this.maxLifeLevel;
    }

    protected generateRandomInt(end: number, start: number = 0): number {
        const smaller = Math.min(start, end),
            bigger = Math.max(start, end),
            truncSmaller = Math.trunc(smaller),
            truncBigger = Math.trunc(bigger);

        return Math.trunc(
            Math.random() * (truncBigger + 1 - truncSmaller) + truncSmaller
        );
    }

    protected getRandomNatureElement(): NatureElement {
        if (!this.natureElements.length) return new AirElement(this);

        const randomPosNatureElement = this.generateRandomInt(
            this.natureElements.length - 1
        );

        return this.natureElements[randomPosNatureElement];
    }

    protected getRandomActionFromNatureElement(
        natureElement: NatureElement
    ): Action {
        let actionT: ActionsT;

        const random0to2 = this.generateRandomInt(2);

        switch (random0to2) {
            case 0:
                actionT = "attack";
                break;
            case 1:
                actionT = "counter-attack";
                break;
            default:
                actionT = "defense";
        }

        return natureElement.actionFactory(actionT);
    }

    getDamage(): number {
        return (this.damageLevel + 1) * 20;
    }
    getDefense(): number {
        return (this.defenseLevel + 1) * 5;
    }
    getAction(): Action {
        return this.getRandomActionFromNatureElement(
            this.getRandomNatureElement()
        );
    }
    getIsAlive(): boolean {
        return this.life > 0;
    }
    getMaxLife(): number {
        return (this.maxLifeLevel + 1) * 100;
    }
    getLife(): number {
        return this.life;
    }
}
