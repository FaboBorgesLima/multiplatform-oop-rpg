import { BaseCard } from "../baseCard.model";
import { Resources } from "../resources.model";

export class CarcassCard extends BaseCard {
    protected name: string = "carcass";
    protected damage: number = 0;
    protected price: Resources = new Resources(0, 0, 0, 0);
    protected description: string = "a dead carcass";

    constructor(life?: number) {
        super();
        this.setInitialLife(0);
        if (life) this.setLife(life);
    }
}
