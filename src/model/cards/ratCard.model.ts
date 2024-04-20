import { BaseCard } from "../baseCard.model";
import { Resources } from "../resources.model";

export class RatCard extends BaseCard {
    protected name: string = "rat";
    protected damage: number = 1;
    protected price: Resources = new Resources(1, 0, 0, 1);
    protected description: string = "a rat";
    constructor() {
        super();

        this.setInitialLife(2);
    }
}
