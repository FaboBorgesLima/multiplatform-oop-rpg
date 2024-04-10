import { BaseCard } from "../baseCard.model";
import { Resources } from "../resources.model";

export class LostSoulCard extends BaseCard {
    constructor() {
        super("lost soul", "a lost soul", new Resources(1, 0, 0, 0));
        this.setDamage(1);
        this.setLife(1);
    }
}
