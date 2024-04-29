import { BaseCard } from "./baseCard.model";
import { CardDeck } from "./cardDeck.model";
import { Resources } from "./resources.model";
import { Trench } from "./trench.model";

export class Challenger {
    protected resources: Resources;
    protected trench: Trench;
    protected deck: CardDeck;
    protected cardsHand: BaseCard[] = [];

    constructor(resources: Resources, trench: Trench, deck: CardDeck) {
        this.resources = resources;
        this.trench = trench;
        this.deck = deck;
    }

    toString(): string {
        return `${this.trench.toString()}\n${this.resources.toString()}`;
    }

    toTable(): string[][] {
        return this.trench.toTable();
    }

    attack(): number[] {
        return this.trench.attack();
    }

    /**
     *
     * @param attack
     * @returns the amount of deads
     */
    reciveAttack(attack: number[]): number {
        const [leftoverAttack, deads] = this.trench.reciveAttack(attack);

        this.resources = Resources.subtract(
            this.resources,
            new Resources(leftoverAttack, 0, 0, 0)
        );

        this.resources = Resources.add(
            this.resources,
            new Resources(0, 0, deads, 0)
        );

        return deads;
    }

    isAlive(): boolean {
        return this.resources.getSouls() > 0;
    }

    getResources(): Resources {
        return this.resources;
    }

    generateResources(): void {
        this.resources = Resources.add(
            this.resources,
            this.trench.getTotalGeneration()
        );
    }

    addCardToDeck(cardName: string): void {
        this.deck.addPossibleCard(cardName);
    }

    drawCardFromDeck(): void {
        this.cardsHand.push(this.deck.getRandomCard());
    }

    getCardsOnHand(): BaseCard[] {
        return this.cardsHand;
    }

    buyCard(posHandCards: number, row: number, col: number): boolean {
        if (posHandCards >= this.cardsHand.length || posHandCards < 0)
            return false;

        const card = this.cardsHand[posHandCards];

        if (
            card.getPrice().isAllSmallerOrEqual(this.resources) &&
            this.resources.getSouls() > card.getPrice().getSouls() &&
            this.trench.insertCard(card, row, col)
        ) {
            this.resources = Resources.subtract(
                this.resources,
                card.getPrice()
            );

            return true;
        }

        return false;
    }

    clear(): void {
        this.trench.clear();

        this.resources.clear();
    }
}
