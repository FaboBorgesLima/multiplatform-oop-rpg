import { BaseCard } from "../baseCard.model";
import { Resources } from "../resources.model";

export class LostSoulCard extends BaseCard {
    protected name: string = "lost soul";
    protected damage: number = 1;
    protected price: Resources = new Resources(1, 0, 0, 0);
    protected description: string = "a lost soul";
    constructor() {
        super();
        this.setLife(1);
    }
}
