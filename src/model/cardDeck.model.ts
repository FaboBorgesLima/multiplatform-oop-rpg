import { BaseCard } from "./baseCard.model";
import { CardFactory } from "./cardFactory.model";
import { ButcherCard } from "./cards/butcherCard.model";
import { LostSoulCard } from "./cards/lostSoulCard.model";
import { RatCard } from "./cards/ratCard.model";

export class CardDeck {
    private possibleCardsNames: string[] = [];

    constructor() {}

    hasCard(cardName: string): boolean {
        return this.possibleCardsNames.includes(cardName);
    }

    addPossibleCard(cardName: string): boolean {
        if (this.possibleCardsNames.includes(cardName)) return false;

        if (!CardFactory.factory(cardName)) return false;

        this.possibleCardsNames.push(cardName);

        return true;
    }

    getRandomCard(): BaseCard {
        const card = CardFactory.factory(
            this.possibleCardsNames[
                this.possibleCardsNames.length * Math.random()
            ]
        );

        if (card) return card;

        return new LostSoulCard();
    }
}
