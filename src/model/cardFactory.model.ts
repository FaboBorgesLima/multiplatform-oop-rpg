import { BaseCard } from "./baseCard.model";
import { ButcherCard } from "./cards/butcherCard.model";
import { CarcassCard } from "./cards/carcassCard.model";
import { LostSoulCard } from "./cards/lostSoulCard.model";
import { RatCard } from "./cards/ratCard.model";

export class CardFactory {
    static factory(cardName: string, life?: number): BaseCard {
        switch (cardName) {
            case "rat":
                return new RatCard(life);
            case "butcher":
                return new ButcherCard(life);
            case "lost soul":
                return new LostSoulCard(life);
            case "carcass":
                return new CarcassCard(life);
        }
        return new LostSoulCard(life);
    }
}
