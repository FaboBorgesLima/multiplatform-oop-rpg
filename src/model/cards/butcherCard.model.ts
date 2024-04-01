import { BaseCard } from "../baseCard.model";
import { Resources } from "../resources.model";

export class ButcherCard extends BaseCard {
    private constructor() {
        super(
            "butcher",
            "a men that collect meat from living things for the war",
            new Resources(5, 0, 0, 0)
        );

        this.setDamage(0);

        this.setGeneration(new Resources(0, 0, 0, 1));
    }
}
