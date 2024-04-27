import { BaseCard } from "../baseCard.model";
import { Resources } from "../resources.model";

export class ButcherCard extends BaseCard {
    protected price: Resources = new Resources(5, 0, 0, 0);
    protected description: string = "a butcher";
    protected name: string = "butcher";
    protected damage: number = 0;
    constructor(life?: number) {
        super();

        this.setInitialLife(1);

        this.setGeneration(new Resources(0, 0, 0, 2));

        if (life) this.setLife(life);
    }
}
