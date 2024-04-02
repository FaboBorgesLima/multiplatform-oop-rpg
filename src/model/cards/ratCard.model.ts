import { BaseCard } from "../baseCard.model";
import { Resources } from "../resources.model";

export class RatCard extends BaseCard {
    constructor() {
        super("rat", "a rat made out of meat", new Resources(1, 0, 0, 1));

        this.setDamage(1);

        this.setInitialLife(1);
    }
}
