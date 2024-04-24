import { BaseCard } from "./baseCard.model";
import { ButcherCard } from "./cards/butcherCard.model";
import { CarcassCard } from "./cards/carcassCard.model";
import { LostSoulCard } from "./cards/lostSoulCard.model";
import { RatCard } from "./cards/ratCard.model";

export class CardFactory {
    static factory(cardName: string): BaseCard {
        switch (cardName) {
            case "rat":
                return new RatCard();
            case "butcher":
                return new ButcherCard();
            case "lost soul":
                return new LostSoulCard();
            case "carcass":
                return new CarcassCard();
        }
        return new CarcassCard();
    }
}
