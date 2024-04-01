import { BaseCard } from "./baseCard.model";
import { Resources } from "./resources.model";

export class Trench {
    readonly N_ROWS = 2;
    readonly N_COLS = 4;
    private cardSet: CardSet = [];

    constructor() {
        this.cardSet = this.createEmptyCardSet();
    }

    public toString(): string {
        let str = "";

        for (let col = 0; col < this.cardSet.length; col++) {
            for (let row = 0; row < this.cardSet[col].length; row++) {
                const card = this.cardSet[col][row];

                if (card) str += card.toString();
                else str += "\nempty\n";
            }
            str += "\n";
        }

        return str;
    }

    private createEmptyCardSet(): CardSet {
        const deck: CardSet = [];

        for (let i = 0; i < this.N_COLS; i++) {
            const row = Array(this.N_ROWS);

            deck.push(row);
        }

        return deck;
    }

    /**
     *
     * @returns the number of cards that died
     */
    private removeDeadCards(): number {
        let removedCards = 0;

        for (let i = 0; i < this.cardSet.length; i++)
            for (let j = 0; j < this.cardSet[i].length; i++)
                if (this.cardSet[i][j] && !this.cardSet[i][j]?.getIsAlive()) {
                    this.cardSet[i][j] = undefined;
                    removedCards++;
                }

        return removedCards;
    }

    attack(): number[] {
        const damages: number[] = [];

        for (let col = 0; col < this.cardSet.length; col++) {
            damages.push(this.getAttackOnCol(col));
        }

        return damages;
    }

    /**
     *
     * @param col the col that you want to get the attack
     * @returns the amount of damage that the col do
     */
    private getAttackOnCol(col: number): number {
        let attack: number = 0;

        for (let row = 0; row < this.cardSet[col].length; row++) {
            const cardAttack = this.cardSet[col][row]?.getDamage();

            if (cardAttack) return cardAttack;
        }

        return attack;
    }

    /**
     *
     * @param col
     * @returns the leftover attack
     *
     * recives the attack and removes the dead cards from the col
     */
    private reciveAttackOnCol(col: number, attack: number): number {
        let leftoverAttack = attack;

        for (let row = 0; row < this.cardSet[col].length; row++) {
            const card = this.cardSet[col][row];

            if (card) {
                leftoverAttack = card.reciveDamage(leftoverAttack);

                if (!card.getIsAlive()) {
                    this.cardSet[col][row] = undefined;
                }
            }
        }

        return leftoverAttack;
    }

    /**
     *
     * @returns the number of cards that died and the amount of leftover damage
     * @param attack is an array with the attacks by col
     */
    reciveAttack(attack: number[]): number {
        let leftoverAttack = 0;

        for (let col = 0; col < this.cardSet.length; col++) {
            const attackOnCol = attack[col];

            leftoverAttack += this.reciveAttackOnCol(col, attackOnCol);
        }

        return leftoverAttack;
    }

    getTotalGeneration(): Resources {
        let rs = new Resources(0, 0, 0, 0);

        for (let col = 0; col < this.cardSet.length; col++) {
            for (let row = 0; row < this.cardSet[col].length; row++) {
                const card = this.cardSet[col][row];

                if (card) rs = Resources.add(rs, card.getGeneration());
            }
        }

        return rs;
    }

    insertCard(card: BaseCard, row: number, col: number): boolean {
        if (row < this.N_ROWS && col < this.N_COLS && !this.cardSet[col][row]) {
            this.cardSet[col][row] = card;
            return true;
        }
        return false;
    }
}
type CardSet = (BaseCard | undefined)[][];
