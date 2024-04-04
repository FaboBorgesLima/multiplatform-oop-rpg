import { BaseCard } from "./baseCard.model";
import { Resources } from "./resources.model";
import { Trench } from "./trench.model";

export class Challenger {
    protected resources: Resources;
    protected trench: Trench;

    constructor(resources: Resources, trench: Trench) {
        this.resources = resources;
        this.trench = trench;
    }

    toString(): string {
        return `${this.trench.toString()}\n${this.resources.toString()}`;
    }

    attack(): number[] {
        return this.trench.attack();
    }

    /**
     *
     * @param attack
     * @returns the amount of deads
     */
    reciveAttack(attack: number[]): number {
        const [leftoverAttack, deads] = this.trench.reciveAttack(attack);

        this.resources = Resources.subtract(
            this.resources,
            new Resources(leftoverAttack, 0, 0, 0)
        );

        this.resources = Resources.add(
            this.resources,
            new Resources(0, 0, deads, 0)
        );

        return deads;
    }

    isAlive(): boolean {
        return this.resources.getSouls() > 0;
    }

    getResources(): Resources {
        return this.resources;
    }

    generateResources(): void {
        this.resources = Resources.add(
            this.resources,
            this.trench.getTotalGeneration()
        );
    }

    buyCard(card: BaseCard, row: number, col: number): boolean {
        if (
            card.getPrice().isAllSmallerOrEqual(this.resources) &&
            this.resources.getSouls() > card.getPrice().getSouls() &&
            this.trench.insertCard(card, row, col)
        ) {
            this.resources = Resources.subtract(
                this.resources,
                card.getPrice()
            );

            return true;
        }

        return false;
    }
}
