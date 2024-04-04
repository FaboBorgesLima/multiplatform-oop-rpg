import { Resources } from "./resources.model";

export class BaseCard {
    private name: string = "";
    private initialLife: number = 0;
    private life: number = 0;
    private damage: number = 0;
    private price: Resources;
    private generation: Resources = new Resources(0, 0, 0, 0);
    private description: string = "";
    static readonly CARD_WIDTH = 40;

    protected constructor(name: string, description: string, price: Resources) {
        this.description = description;
        this.name = name;
        this.price = price;
    }

    /**
     *
     * @param generation can't have souls
     * @returns
     */
    protected setGeneration(generation: Resources): boolean {
        if (generation.getSouls()) return false;

        this.generation = generation;

        return true;
    }

    public getDescription(): string {
        return this.description;
    }

    public getGeneration(): Resources {
        return this.generation;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): Resources {
        return this.price;
    }

    public static emptyToString(): string {
        let output = "";

        for (let i = 0; i < 4; i++) {
            output += this.fillStringToCardWidth("") + "|\n";
        }

        return output + "\n";
    }

    public toString(): string {
        return `\n${BaseCard.fillStringToCardWidth(
            this.name
        )}|\n${BaseCard.fillStringToCardWidth(
            this.description
        )}|\n${BaseCard.fillStringToCardWidth(
            `Hp: ${this.life}/${this.initialLife}`
        )}|\n${BaseCard.fillStringToCardWidth(`${this.damage} damage`)}|\n`;
    }

    private static fillStringToCardWidth(str: string): string {
        let output = str;

        while (output.length < this.CARD_WIDTH) {
            output += " ";
        }

        return output;
    }

    protected setDamage(damage: number): boolean {
        if (damage >= 0) {
            this.damage = Math.trunc(damage);
            return true;
        }
        return false;
    }

    protected setLife(life: number): void {
        this.life = Math.max(Math.trunc(life), 0);
    }

    protected setInitialLife(initialLife: number): boolean {
        const truncatedInitialLife = Math.trunc(initialLife),
            initialLifeIsGraterThanOne = truncatedInitialLife > 0;

        if (initialLifeIsGraterThanOne) {
            this.initialLife = truncatedInitialLife;
            this.life = truncatedInitialLife;
        }

        return initialLifeIsGraterThanOne;
    }

    public getDamage(): number {
        return this.damage;
    }

    public getLife(): number {
        return this.life;
    }

    public getInitialLife(): number {
        return this.initialLife;
    }

    public getIsAlive(): boolean {
        return this.life > 0;
    }

    /**
     *
     * @returns leftover damage
     */
    public reciveDamage(damage: number): number {
        const remainingLife = this.life - damage;

        this.setLife(remainingLife);

        if (remainingLife > 0) return 0;

        return Math.abs(remainingLife);
    }
}
