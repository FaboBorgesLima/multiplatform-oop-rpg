import { Resources } from "./resources.model";
import { Trench } from "./trench.model";

export class Challenger {
    protected resources: Resources;
    protected trench: Trench;

    constructor(resources: Resources, trench: Trench) {
        this.resources = resources;
        this.trench = trench;
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
    getTrench(): Trench {
        return this.trench;
    }
}
