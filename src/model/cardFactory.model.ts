import { BaseCard } from "./baseCard.model";
import { ButcherCard } from "./cards/butcherCard.model";
import { LostSoulCard } from "./cards/lostSoulCard.model";
import { RatCard } from "./cards/ratCard.model";

export class CardFactory {
    static factory(cardName: string): BaseCard | undefined {
        switch (cardName) {
            case "rat":
                return new RatCard();
            case "butcher":
                return new ButcherCard();
            case "lost soul":
                return new LostSoulCard();
        }
    }
}
